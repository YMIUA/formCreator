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

const Header = ({ isShowLink, text }) => {

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {
        isShowLink
        ? (
          <>
            <Link to="/">
              <Button className={classes.button}>
                Home
              </Button>
            </Link>
            <Link to="/newForm">
              <Button className={classes.button}>
                <AddIcon/>
              </Button>
            </Link>
          </>
        )
        : null
      }
      {
        text
        ? <p>{text}</p>
        : null
      }
    </div>
  );
};

export default Header;
