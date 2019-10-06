import React from 'react';
import Header from './../components/Header'
import FillsTable from './../containers/FillsTable'

const SeeAllForm = ({ match }) => {
  return (
    <>
      <Header isShowLink/>
      <FillsTable formId={match.params.formId}/>
    </>
  );
};

export default SeeAllForm
