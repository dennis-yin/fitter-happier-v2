import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navBar: {
    color: 'red',
    gridColumn: '1 / -1',
    gridRow: '1 / span 1'
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return <div className={classes.navBar}></div>;
}
