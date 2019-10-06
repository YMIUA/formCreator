import React from 'react';
import Header from '../components/Header'
import FormConstructor from '../containers/FormConstructor'


const FormConstructorPage = ({ match }) => {

  return (
    <div>
      <Header isShowLink/>
      <FormConstructor formId={match ? match.params.formId : false} />
    </div>
  );
}

export default FormConstructorPage
