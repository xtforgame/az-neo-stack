import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {
  Redirect,
} from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import createCommonStyles from 'azrmui/styles/common';
import createFormPaperStyle from 'azrmui/styles/FormPaper';

import SwipeableViews from 'react-swipeable-views';

import preloadedStateContext from 'common/react/az-preloaded-state-context';

import LoginForm from './LoginForm';

const useStyles = makeStyles(theme => ({
  ...createFormPaperStyle(theme),
  ...createCommonStyles(theme, ['flex', 'appBar']),
}));

export default (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState('admin@foo.bar');
  const [loginError, setLoginError] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const { location, session } = props;
    if (!location || !session) {
      return;
    }
    const fromPath = location.state && location.state.from.pathname;
    if (!session && fromPath) {
      console.warn(`Redirected page from ${fromPath} to Login`);
    }
  }, []);

  const {
    login: li,
    // session,
    state: {
      session,
      sessionExists,
    },
  } = useContext(preloadedStateContext);

  const swipeTo = (tabIndex) => {
    setTabIndex(tabIndex);
  };

  const login = ({ username, password, rememberMe }) => {
    // const { rememberMe: remember } = props;
    // remember(rememberMe);
    // popup('/auth-popup.html');
    // return ;

    li({
      auth_type: 'basic',
      username,
      password,
    }, rememberMe)
    .catch((error) => {
      setLoginError(error);
    });
  };

  if (session && sessionExists) {
    return <Redirect to={{ pathname: '/gm' }} />;
  }

  const titles = ['登入', '註冊', '忘記密碼'];
  const title = titles[tabIndex];


  return (
    <div className={classes.flexContainerFH}>
      <div className={classes.flex1} />
      <Paper className={classes.paper} elevation={4}>
        <AppBar position="static">
          <Toolbar>
            {tabIndex !== 0 && (
              <IconButton className={classes.menuButton} color="inherit" aria-label="Back" onClick={() => { swipeTo(0); }}>
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6" color="inherit" className={classes.flex1}>
              {title}
            </Typography>
            {/* <LocaleDropdown /> */}
          </Toolbar>
        </AppBar>
        <SwipeableViews
          index={tabIndex}
          {...{}/* onChangeIndex={this.handleChangeIndex} */}
          disabled
        >
          <LoginForm
            namespace="login"
            username={username}
            onUsernameChange={username => setUsername(username)}
            usernameError={tabIndex === 0 && !!loginError}
            passwordError={tabIndex === 0 && loginError && '帳號或密碼錯誤'}
            onSubmit={login}
          />
        </SwipeableViews>
      </Paper>
      <div className={classes.flex1} />
    </div>
  );
};
