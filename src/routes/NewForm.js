import React from 'react';
import { connect } from 'react-redux'

const NewForm = (store) => {
    return (
        <p>Hew form</p>

    );
}

export default connect((store)=>{return store})(NewForm)
