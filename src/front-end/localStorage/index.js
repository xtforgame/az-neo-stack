import { jwtIssuer } from 'common/config';

const stateKey = `${jwtIssuer}:state`;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('loadState error :', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // console.log('state :', state);
    const serializedState = JSON.stringify(state);
    localStorage.setItem(stateKey, serializedState);
  } catch (err) {
    console.error('saveState error :', err);
  }
};

export const removeState = () => {
  localStorage.removeItem(stateKey);
};

// marked, don't clear state of other app in the same domain
// export const clearState = () => {
//   localStorage.clear();
// };

// ==================

// const delaySave = throttle((store) => {
//   const state = store.getState();
//   const persistedData = state.global;

//   if (rememberUserSelector(state) && userSessionSelector(state)) {
//     const {
//       cache: {
//         session,
//       },
//       persistence,
//     } = persistedData;
//     saveState({
//       cache: {
//         session,
//       },
//       persistence,
//     });
//   } else {
//     // removeState();
//     localStorage.clear();
//   }
// }, 300);

// export const middleware = store => next => (action) => {
//   setTimeout(() => {
//     delaySave(store);
//   }, 0);
//   return next(action);
// };
