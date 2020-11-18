import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RrdLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    // color: 'unset',
    // cursor: 'unset',
    // textDecoration: 'unset',
  },
}));

export default process.env.reactSsrMode
  ? getLinkUrl => ({
    path, className, children, ...props
  }) => {
    const classes = useStyles();
    return (
      <a href={getLinkUrl(path)} className={clsx(classes.link, className)} {...props}>
        {children}
      </a>
    );
  }
  : getLinkUrl => ({
    path, className, children, ...props
  }) => {
    const classes = useStyles();
    return (
      <RrdLink to={getLinkUrl(path)} className={clsx(classes.link, className)} {...props}>
        {children}
      </RrdLink>
    );
  };
