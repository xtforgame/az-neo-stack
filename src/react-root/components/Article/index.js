/* eslint-disable jsx-a11y/alt-text, react/no-array-index-key */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageContainer from '../ImageContainer';
import BreakAllContentText from '../BreakAllContentText';
import Block from './Block';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // textAlign: 'center',
    color: '#000000',
  },
  container: {
    width: 780,
  },
  title: {
    textAlign: 'left',
    fontSize: 40,
    marginTop: 10,
    marginBottom: 72,
  },
}));

export default (props) => {
  const {
    data,
  } = props;

  const classes = useStyles();

  return (
    <ImageContainer
      className={classes.root}
    >
      <div className={classes.container}>
        <div className={classes.title}>
          <BreakAllContentText style={{ fontFamily: 'FilsonSoft-Bold', lineHeight: 1 }}>
            {data.title}
          </BreakAllContentText>
        </div>
        {(data.content || []).map((c, i) => (<Block key={i} data={c} />))}
      </div>
    </ImageContainer>
  );
};
