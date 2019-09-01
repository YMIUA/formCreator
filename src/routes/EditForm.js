import React from 'react';
import { connect } from 'react-redux'

const EditForm = (store) => {
    return (
        <p>Edit form</p>

    );
}

export default connect((store)=>{return store})(EditForm)
