import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        height: '48px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
});

const Header = (store) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <p>Header</p>
        </div>

    );
}

export default connect((store)=>{return store})(Header);
