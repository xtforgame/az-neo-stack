// import {
//   // RestfulResponse,
//   RestfulError,
// } from 'az-restful-helpers';
import RouterBase from '../core/router-base';

export default class SystemInfoRouter extends RouterBase {
  constructor(...args) {
    super(...args);
    this.systemInfo = {
      features: {},
    };
  }

  setupRoutes({ router }) {
    router.get('/api/system-info', (ctx, next) => ctx.body = this.systemInfo);
  }

  onAllStarted(containerInterface) {
    if (this.minioApi.isReady) {
      this.systemInfo.features.objectStorage = true;
    }
  }
}
