import pathLib from 'path';
import { urlPrefix } from 'common/config';
import { forEachNode } from 'react-root/desktop/navigation';
import { forEachNode as forEachMobileNode } from 'react-root/mobile/navigation';
import renderer from './renderer';
import RouterBase from '../core/router-base';

export default class SsrRouter extends RouterBase {
  setupRoutes({ router }) {
    if (process.env.reactSsrMode) {
      forEachNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(path, this.authKit.koaHelperEx.getIdentity, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            if (ctx.local.mobileDetect.phone()) {
              ctx.status = 301;
              ctx.redirect(pathLib.join(`${urlPrefix}mobile`, p.replace(urlPrefix, '')));
              return;
            }
            renderer(ctx, ctx.path, {
              canonicalPath,
            });
            // next();
          });
        }
      });

      forEachMobileNode((node) => {
        const { path, canonicalPath } = node;
        if (path != null) {
          router.get(path, this.authKit.koaHelperEx.getIdentity, (ctx, next) => {
            const p = ctx.path.toLowerCase();
            if (p !== ctx.path) {
              ctx.status = 301;
              ctx.redirect(p);
              return;
            }
            renderer(ctx, ctx.path, {
              canonicalPath, // ctx.path.replace(/\/mobile/g, ''),
            });
            // next();
          });
        }
      });

      router.get('/articles/:articleId', (ctx, next) => {
        renderer(ctx, `/articles/${ctx.params.articleId}`, {});
      });
    }
  }
}
