import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getFillsData, fillsSelector } from './../store/reducers/fills';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  editIcon: {
    height: 20,
    textDecoration: 'none',
    color: 'black',
  }
}));

const createTableHeader = (fields) => (
  fields.map(( cell, index ) => (
    <TableCell align='center' >{cell}</TableCell>
  ))
);

const createTableRow = (field, keys) => (
  keys.map( key => (
    <TableCell align='center'>{field[key]}</TableCell>
  ))
);

const ListForm = ({ formId, fills, getFillsData }) => {

  const classes = useStyles();

  let header;
  let rows;

  useEffect(() => {
    getFillsData(formId)
  }, []);

  if(fills.isLoaded){
    const keys = Object.keys(fills.fills[1].fields);
    header = createTableHeader(keys);
    rows = fills.fills.map(item => {
      return (
        <TableRow >
          { createTableRow(item.fields, keys) }
        </TableRow>
      )
    })
  } else {
    return <p>Loading...</p>
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = (store) => ({
  fills: fillsSelector(store),
});


export default connect(mapStateToProps, { getFillsData })(ListForm)