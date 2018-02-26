/* eslint-disable flowtype/require-valid-file-annotation */

import { create } from 'jss';
import { SheetsRegistry } from 'react-jss';
import preset from 'jss-preset-default';
import { createMuiTheme, createTypography } from 'material-ui/styles';
import { purple, green, blue, black, pink, grey, common } from 'material-ui/colors';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// const theme = createMuiTheme({
//   palette: {
//     primary: purple,
//     secondary: green,
//   },
// });

export function getTheme(theme) {
  let paletteType = theme.paletteType;
  let primary = blue;
  let secondary = pink;
  let background = {
    paper: common.white,
    default: grey[50],
  };
  if(theme.paletteType === 'dark'){
    primary = black;
    background = {
      paper: grey[800],
      default: '#303030',
    };
  }else if(theme.paletteType === 'vaxal'){
    primary = {
      light: '#765cb7',
      main: '#463287',
      dark: '#120b59',
      contrastText: common.white,
    };
    secondary = {
      light: '#78deff',
      main: '#3dacd3',
      dark: '#007da2',
      contrastText: common.white,
    };
    background = {
      paper: grey[100],
      default: grey[200],
    };
    paletteType = 'light';
  }

  return createMuiTheme({
    direction: theme.direction,
    typography: {
      fontFamily: `"Noto Sans TC", "Noto Sans SC", "Noto Sans JP", "Roboto", sans-serif`,
    },
    palette: {
      primary,
      secondary,
      type: paletteType,
      background,
    },
    status: {
      success: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
  });
}

const theme = getTheme({
  direction: 'ltr',
  // paletteType: 'light',
  paletteType: 'dark',
  // paletteType: 'vaxal',
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
