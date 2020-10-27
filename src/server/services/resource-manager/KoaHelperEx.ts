// ========================================
import { Sequelize } from 'sequelize';
import AmmOrm from 'az-model-manager/core';
import {
  AuthCore,
  AuthProviderManager,
  KoaHelper,
  BasicProvider,
} from 'az-authn-kit-v2';
import {
  jwtIssuer,
} from 'config';
import AuthProviders from './AuthProviders';
import ServiceBase from '../ServiceBase';

import SequelizeStore from './SequelizeStore';

import createAsuModelDefs from '../../amm-schemas';

import initDatabase from './initDatabase';
import { AuthKit } from './insterfaces';

// ========================================

export default class KoaHelperEx {
  koaHelper: KoaHelper;

  constructor(koaHelper: KoaHelper) {
    this.koaHelper = koaHelper;
  }

  authenticate = async(ctx, next) => {
    const session = await this.koaHelper.authenticate(ctx, next);
    if (session && session.token) {
      // const s = this.koaHelper.authCore.verifyToken(session.token, () => {});
      ctx.cookies.set(
        'login-session',
        session.token,
        {
          // domain: 'localhost',
          // path: '/index',
          maxAge: 1000000 * 60 * 1000,
          // expires: new Date('2017-02-15'),
          httpOnly: true,
          overwrite: true,
        },
      );
      ctx.cookies.set(
        'login-session-exists',
        'true',
        {
          // domain: 'localhost',
          // path: '/index',
          maxAge: 1000000 * 60 * 1000,
          // expires: new Date('2017-02-15'),
          httpOnly: false,
          overwrite: true,
        },
      );
    }
    return session;
  }

  getIdentity = (ctx, next) => {
    this.koaHelper._ensureLocal(ctx);

    if (ctx.local.userSession) {
      return next();
    }
    ctx.local.userSession = this.koaHelper.authCore.verifyAuthorization(ctx.request.headers);
    if (!ctx.local.userSession) {
      const token = ctx.cookies.get('login-session');
      if (token) {
        ctx.local.userSession = this.koaHelper.authCore.verifyToken(token, () => {});
      }
    }
    return next();
  }
}
