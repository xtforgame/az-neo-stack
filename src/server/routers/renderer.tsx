import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { I18nextProvider } from 'react-i18next'; // has no proper import yet
import Routes from 'react-root/Routes';
import { urlPrefix, routerPrefix, publicUrlBase } from 'common/config';
import preloadedStateContext, { injectionKey, AzPreloadedState } from 'common/react/az-preloaded-state-context';
import renderHtml from '../../../azdata/renderHtml';

export type RenderOptions = {
  canonicalPath: string;
};

export default (ctx, path, { canonicalPath } : RenderOptions = { canonicalPath: '' }) => {
  const sheets = new ServerStyleSheets();

  const azPreloadedState : AzPreloadedState = ctx.local.azPreloadedState || {};
  azPreloadedState.md = ctx.local.md;
  azPreloadedState.i18n = ctx.local.i18n;

  console.log('path :', path);
  const context : any = {};
  const content = renderToString(
    sheets.collect(
      <preloadedStateContext.Provider value={{ state: azPreloadedState }}>
        <I18nextProvider i18n={ctx.request.i18n}>
          <StaticRouter basename={routerPrefix} location={path} context={context}>
            {renderRoutes(Routes)}
          </StaticRouter>
        </I18nextProvider>
      </preloadedStateContext.Provider>
    ),
  );

  if (context.url) {
    console.log('context :', context);
    ctx.status = 301;
    ctx.redirect(context.url);
    return;
  }

  const css = sheets.toString();

  ctx.body = renderHtml({
    urlPrefix,
    css,
    content,
    header: canonicalPath != null ? `<link rel="canonical" href="${publicUrlBase}${canonicalPath}" />` : '',
    body: `<script src="${urlPrefix}assets/js/app.js"></script>`,
    azPreloadedStateKey: injectionKey,
    azPreloadedState,
  });
};
