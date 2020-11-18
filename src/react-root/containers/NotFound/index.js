import { useContext } from 'react';
import preloadedStateContext from 'common/react/az-preloaded-state-context';

export default (props) => {
  const {
    state: {
      md: {
        mobile,
      },
    },
  } = useContext(preloadedStateContext);
  if (mobile) {
    return 'MobileNotFound';
  }
  return 'NotFound';
};
