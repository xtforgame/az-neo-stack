import React, { useContext } from 'react';
import preloadedStateContext from 'common/react/az-preloaded-state-context';
import { makeStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import NotFound from '~/containers/NotFound';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {},
  appBarPlaceholder: {
    ...theme.mixins.toolbar,
    // height: 56,
    // [theme.breakpoints.up('sm')]: {
    //   height: 64,
    // },
    flexShrink: 0,
  },
}));

export default ({ route: { routes } }) => {
  const classes = useStyles();
  const {
    state: {
      notFound,
    },
  } = useContext(preloadedStateContext);
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.appBarPlaceholder} />
      {notFound && (<NotFound />)}
      {!notFound && renderRoutes(routes)}
    </div>
  );
};
