import React, { useEffect } from 'react'
import Header from './../components/Header'
import FillingForm from './../containers/FillingForm'
import { fillingFormSelector, getForm, setFieldValue, sendForm } from "../store/reducers/fillingForm";
import {connect} from "react-redux";


const Form = ({ fillingForm, match, getForm, setFieldValue, sendForm }) => {

  useEffect(() => {
    fillingForm.isLoaded || getForm(match.params.formId)
  });

  return (
    <>
      <Header
        isShowLink={false}
        text={fillingForm.formsData.name}
      />
      <FillingForm
        isLoading={fillingForm.isLoading}
        form={fillingForm.formsData}
        setFieldValue={setFieldValue}
        fieldValue={fillingForm.fieldValue}
        sendForm={sendForm}
      />
    </>
  )
};

const mapStateToProps = (store) => ({
  fillingForm: fillingFormSelector(store),
});

const mapDispatchToProps = ({
  getForm,
  setFieldValue,
  sendForm
});

export default connect(mapStateToProps, mapDispatchToProps)(Form)
