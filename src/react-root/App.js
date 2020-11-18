import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';

import ThemeContainer from './core/ThemeContainer';

const uiTheme = {
  direction: 'ltr',
  paletteType: 'light',
  // paletteType: 'dark',
  // paletteType: 'vaxal',
};

const useStyles = makeStyles(() => ({
  '@global': {
    pre: {
      fontFamily: 'FilsonSoftRegular',
      // lineHeight: 'normal',
    },
    body: {
      backgroundColor: '#ffffff',
    },
  },
}));

const Container = ({ children }) => {
  useStyles();
  return (
    <div
      style={{
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ({ route, ...rest }) => (
  <ThemeContainer uiTheme={uiTheme}>
    <Container>
      {renderRoutes(route.routes)}
    </Container>
  </ThemeContainer>
);
