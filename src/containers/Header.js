import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  wrapper: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
    backgroundColor: '#eee',
  },
  button: {
    height: 40,
    marginTop: 5,
  }
});

const Header = () => {

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link to="/newForm">
        <Button className={classes.button}>
          <AddIcon/>
        </Button>
      </Link>
      <p>Header</p>
    </div>
  );
};

export default Header;
