import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './../containers/Header'
import NewFormConstructor from '../containers/NewFormConstructor'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const NewForm = () => {
  const classes = useStyles();

  return (
    <div>
      <Header/>
      <NewFormConstructor/>
    </div>
  );
}

export default NewForm
