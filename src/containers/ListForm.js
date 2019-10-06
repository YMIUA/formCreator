import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'

import { allFormsSelector, getFormsData } from './../store/reducers/allForms';

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

const createData = ({ name, fields, id}) => ({ name, fields, id });

const createFields = ({ forms = []}) => forms.map(item=>
  createData(item));


const ListForm = ({ getFormsData, allForms }) => {

  useEffect(() => {
      if(!allForms.isLoaded){
          getFormsData()
      }
  });

  const classes = useStyles();
  const rows = createFields(allForms);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Num fields</TableCell>
              <TableCell align="right">Num filled in</TableCell>
              <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              <Link to={`/fills/${row.id}`}>
                {row.name}
              </Link>
            </TableCell>
            <TableCell align="right">{row.fields}</TableCell>
            <TableCell align="right">{row.id}</TableCell>
            <TableCell align="right">
              <Link to={`/editForm/${row.id}`}>
                <EditIcon className={classes.editIcon}/>
              </Link>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = (store) => ({
    allForms: allFormsSelector(store),
});


export default connect(mapStateToProps, { getFormsData })(ListForm)