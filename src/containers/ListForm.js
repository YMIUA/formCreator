import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableHeader: {
        marginTop: '10px',
        height: '48px',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
});

const Header = (store) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.tableHeader}>
                <div className="formName">
                    <p>Name</p>
                </div>
                <div className="formFields">
                    <p>Num fields</p>
                </div>
                <div className="formCount">
                    <p>Num filled in</p>
                </div>
            </div>
        </div>

    );
}

export default connect((store)=>{return store})(Header);
