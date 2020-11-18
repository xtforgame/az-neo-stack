import React from 'react';

export const injectionKey = '__AZ_PRELOADED_STATE__';

export type AzPreloadedState = {
  notFound: boolean; // is rendering a not found page
  reactRenderMode: 'ssr' | 'csr';
  md: {
    mobile: string | null;
    phone: string | null;
    tablet: string | null;
  };
  i18n: {
    initialI18nStore: { [s : string]: {} };
    initialLanguage: string;
  };
  sesstion?: {
    user_id: string;
    user_name: string;
    privilege: string;
  };
  sessionExists?: boolean;
};

export type State = AzPreloadedState & {
};

export type Context = {
  state: State,
};

export default React.createContext<Context>({
  state: {
    notFound: false,
    reactRenderMode: process.env.reactSsrMode ? 'ssr' : 'csr',
    md: {
      mobile: null,
      phone: null,
      tablet: null,
    },
    i18n: {
      initialI18nStore: {},
      initialLanguage: '',
    },
  },
});
