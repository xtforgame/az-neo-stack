import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    border: 'solid 1px #000000',
    width: 300,
    // height: 300,
    margin: 10,
    padding: 10,
  },
}));

export default ({ artcle, Link }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      Title:
      <br />
      {artcle.title}
      <br />
      <br />
      Desc.:
      <br />
      {artcle.description}
      <br />
      <br />
      <img width="100%" alt={artcle.title} src={artcle.thumbnail} />
      <br />
      <br />
      <Link path={`${artcle.category.routePathPrefix}${artcle.id}`}>
        Read
      </Link>
    </div>
  );
};
