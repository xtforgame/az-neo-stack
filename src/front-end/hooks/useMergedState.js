import { useState } from 'react';
import axios from 'axios';

import { injectionKey } from 'common/react/az-preloaded-state-context';
import { loadState, saveState, removeState } from '../localStorage';
import getMobileDetect from '../utils/getMobileDetect';

const getCookieValueByIndex = (startIndex) => {
  let endIndex = document.cookie.indexOf(';', startIndex);
  if (endIndex === -1) endIndex = document.cookie.length;
  return unescape(document.cookie.substring(startIndex, endIndex));
};

const getCookie = (name) => {
  const arg = `${escape(name)}=`;
  const nameLen = arg.length;
  const cookieLen = document.cookie.length;
  let i = 0;
  while (i < cookieLen) {
    const j = i + nameLen;
    if (document.cookie.substring(i, j) === arg) return getCookieValueByIndex(j);
    i = document.cookie.indexOf(' ', i) + 1;
    if (i === 0) break;
  }
  return null;
};

export default () => {
  const localState = loadState();
  const [sessionExists, setSessionExists] = useState(getCookie('login-session-exists') === 'true');
  const [session, setSession] = useState(localState && localState.session);
  const headers = {};
  // if (session) {
  //   headers.authorization = `${session.token_type} ${session.token}`;
  // }
  const axiosApi = axios.create({
    headers,
  });

  const login = (data, rememberMe) => axiosApi({
    method: 'post',
    url: 'api/sessions',
    data,
  })
  .then(({ data }) => {
    if (data.error) {
      return Promise.reject(data.error);
    }
    setSession(data);
    setSessionExists(getCookie('login-session-exists') === 'true');
    if (rememberMe) {
      saveState({ session: data });
    }
    return true;
    // removeState();
  });

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const {
    isMobile,
  } = getMobileDetect(userAgent);

  const mdFromServer = window[injectionKey] && window[injectionKey].md;

  return {
    state: {
      ...window[injectionKey],
      md: {
        mobile: isMobile ? 'unknown' : null,
        phone: isMobile ? 'unknown' : null,
        tablet: isMobile ? 'unknown' : null,
        ...mdFromServer,
      },
      ...localState,
      ...{ session },
      sessionExists: !!sessionExists,
    },
    axiosApi,
    login,
  };
};
