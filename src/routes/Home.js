import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';

import Header from './../containers/Header'

const useStyles = makeStyles({

});

const Home = (store) => {

    return (
        <div>
            <Header />
        </div>

    );
}

export default connect((store)=>{return store})(Home);
