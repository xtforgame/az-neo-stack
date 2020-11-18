/* eslint-disable no-console, import/no-extraneous-dependencies */
import { httpPort, httpsPort } from 'config';
import Koa from 'koa';
import koaStatic from 'koa-static';
import createRouterClass from 'generic-router';
import bodyParser from 'koa-bodyparser';
import { RestfulError } from 'az-restful-helpers';
import http from 'http';
import path from 'path';
import appRootPath from 'app-root-path';
import MobileDetect from 'mobile-detect';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import { urlPrefix } from 'common/config';
import i18n from 'common/react/i18n';
import getWebpackService from './webpack-service';
import runServer from './runServer';
import ServiceBase from '../ServiceBase';
import renderer from '../../routers/renderer';

const appRoot = appRootPath.resolve('./');
const methods = http.METHODS.map(method => method.toLowerCase());

export default class HttpApp extends ServiceBase {
  static $name = 'httpApp';

  static $type = 'service';

  static $inject = ['envCfg'];

  static $funcDeps = {
    start: ['routerManager', 'mailer'],
  };

  constructor(envCfg) {
    super();
    this.app = new Koa();
    this.app.proxy = !!process.env.KOA_PROXY_ENABLED;
    // prevent any error to be sent to user
    this.app.use((ctx, next) => next()
    .then(() => {
      if (ctx.body == null && ctx.status === 404) {
        renderer(ctx, `${urlPrefix}not-found`, { notFound: true });
      }
    })
    .catch((err) => {
      if (err instanceof RestfulError) {
        return err.koaThrow(ctx);
      }
      // console.log('err.restfulError :', err.restfulError);
      if (!err.status) {
        console.error(err);
        console.error(err.stack);
        ctx.throw(500);
      }
      throw err;
    }));
    this.app.use(bodyParser({
      formLimit: '10mb',
      jsonLimit: '10mb',
      textLimit: '10mb',
    }));
    const i18nextHandle = i18nextMiddleware.handle(i18n, {
      send: () => {
        // console.log('send');
      },
    });
    this.app.use((ctx, next) => {
      ctx.response.setHeader = (k, v) => {
        ctx.response.set(k, v);
      };
      return new Promise((res, rej) => {
        try {
          i18nextHandle(ctx.request, ctx.response, (r) => {
            next()
            .then(() => {
              res(r);
            })
            .catch(rej);
          });
        } catch (error) {
          rej(error);
        }
      });
    });
    this.app.use((ctx, next) => {
      ctx.local = ctx.local || {
        mobileDetect: new MobileDetect(ctx.request.headers['user-agent']),
      };
      ctx.local.md = {
        mobile: ctx.local.mobileDetect.mobile(),
        phone: ctx.local.mobileDetect.phone(),
        tablet: ctx.local.mobileDetect.tablet(),
      };
      const initialI18nStore = {};
      if (ctx.request.i18n) {
        ctx.request.i18n.languages.forEach((l) => {
          initialI18nStore[l] = ctx.request.i18n.services.resourceStore.data[l];
        });
        const initialLanguage = ctx.request.i18n.language;
        ctx.local.i18n = {
          initialI18nStore,
          initialLanguage,
        };
      } else {
        ctx.local.i18n = {
          initialI18nStore,
          initialLanguage: '',
        };
      }
      return next();
    });
    /* let credentials = */this.credentials = envCfg.credentials;

    const KoaRouter = createRouterClass({
      methods,
    });
    this.router = new KoaRouter();
    this.app
    .use(this.router.routes())
    .use(this.router.allowedMethods());

    this.appConfig = {
      router: this.router, /* , app: this.app, azLrApp, credentials */
    };
  }

  async onStart() {
    // ======================================================
    await new Promise((resolve) => {
      i18n
      .use(Backend)
      .use(i18nextMiddleware.LanguageDetector)
      .init(
        {
          ns: ['app-common'],
          defaultNS: 'app-common',
          // fallbackLng: 'en',
          fallbackLng: {
            'zh-TW': ['zh-TW', 'en'],
            'zh-CN': ['zh-CN', 'en'],
            default: ['en'],
          },
          debug: false,
          preload: ['en', 'de', 'js', 'zh-TW', 'zh-CN'],
          backend: {
            loadPath: `${appRoot}/public/translations/{{ns}}/{{lng}}.json`,
            addPath: `${appRoot}/public/translations/{{ns}}/{{lng}}.missing.json`,
          },
          react: {
            useSuspense: false,
          },
        },
        () => { resolve(); },
      );
    });
    let p = Promise.resolve();
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      const { middlewarePromise, compileDonePromise } = getWebpackService();
      p = middlewarePromise
      .then((middleware) => {
        this.app.use(middleware);
        this.closeWebpack = () => Promise.resolve()
        .then(() => new Promise((resolve, reject) => {
          middleware.close(resolve);
        }));
      });
      if (process.env.NODE_ENV === 'test') {
        p = p.then(() => compileDonePromise);
      }
    } else {
      this.closeWebpack = Promise.resolve();
      this.app.use(koaStatic(path.join(appRoot, 'dist', 'front-end')));
    }
    // ========================================
    return p.then(() => new Promise((resolve) => {
      const cb = (httpServer, httpsServer) => resolve({ httpServer, httpsServer });
      runServer(this.app, this.credentials, cb, httpPort, httpsPort);
    }))
    .then(({ httpServer, httpsServer }) => {
      this.httpServer = httpServer;
      this.httpsServer = httpsServer;
    });
  }

  onDestroy() {
    let p = Promise.resolve();
    if (this.httpServer) {
      p = p.then(() => new Promise(resolve => this.httpServer.shutdown(() => {
        this.httpServer = null;
        resolve();
      })));
    }
    if (this.httpsServer) {
      p = p.then(() => new Promise(resolve => this.httpsServer.shutdown(() => {
        this.httpsServer = null;
        resolve();
      })));
    }
    p = p.then(this.closeWebpack || (() => {}));
    return p.then(() => {
      console.log('Everything is cleanly shutdown.');
    });
  }
}
