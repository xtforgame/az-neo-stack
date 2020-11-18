import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Routes from 'react-root/Routes';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { initReactI18next, useSSR } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import preloadedStateContext, { injectionKey } from 'common/react/az-preloaded-state-context';

import {
  routerPrefix,
  urlPrefix,
} from 'common/config';
import i18n, { i18nInit } from 'common/react/i18n';
import useMergedState from './hooks/useMergedState';

class DebugRouter extends BrowserRouter {
  constructor(props) {
    super(props);
    // console.log('initial history is: ', JSON.stringify(this.history, null, 2));
    this.history.listen((location, action) => {
      // console.log(
      //   `The current URL is ${location.pathname}${location.search}${location.hash}`
      // );
      // console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}

const Router = process.env.reactSsrMode ? DebugRouter : HashRouter;

const getInitialI18nStore = () => window[injectionKey] && window[injectionKey].i18n && window[injectionKey].i18n.initialI18nStore;

const Main = () => {
  if (process.env.reactSsrMode) {
    useSSR(getInitialI18nStore(), window[injectionKey].i18n.initialLanguage);
  }
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const mergedPreloadedData = useMergedState();
  return (
    <preloadedStateContext.Provider
      value={mergedPreloadedData}
    >
      <Router basename={routerPrefix}>
        {renderRoutes(Routes)}
      </Router>
    </preloadedStateContext.Provider>
  );
};

// const renderMethod = module.hot && !process.env.reactSsrMode ? ReactDOM.render : ReactDOM.hydrate;
const renderMethod = process.env.reactSsrMode ? ReactDOM.hydrate : ReactDOM.render;

const renderApp = async () => {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector);
  await i18nInit({
    ns: ['app-common'],
    defaultNS: 'app-common',

    // fallbackLng: 'en',
    fallbackLng: {
      'zh-TW': ['zh-TW', 'en'],
      'zh-CN': ['zh-CN', 'en'],
      default: ['en'],
    },
    debug: false,

    // (overrides language detection)
    // lng: DEFAULT_LOCALE,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `${urlPrefix}translations/{{ns}}/{{lng}}.json`,
    },
    react: {
      useSuspense: false,
    },
  });
  const initialI18nStore = getInitialI18nStore();
  if (initialI18nStore) {
    i18n.services.resourceStore.data = initialI18nStore;
  }
  renderMethod(
    <Main />,
    document.getElementById('page_main'),
  );
};

renderApp();
