import React, { Fragment, useEffect} from 'react';
import { TextField , Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import NewFormField from './../components/NewFormField';
import {
  formConstructorSelector,
  addField,
  setFieldType,
  setFieldName,
  deleteField,
  addItemForDropdown,
  setNameForDropdown,
  deleteItemForDropdown,
  sendNewForm,
  sendFormUpdate,
  getForm,
  setFormData
} from '../store/reducers/formConstructor';
import { fillingFormSelector } from '../store/reducers/fillingForm'
import { formNameSelector, setName } from '../store/reducers/formName'


const useStyles = makeStyles(theme => ({
  container: {
    width: '90%',
    margin: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textField: {
    margin: 'auto',
    width: '80%',
  },
  formsFields: {
    marginTop: 20,
    width: '90%',
    margin: 'auto',
  },
  button: {
    width: '60%',
    margin: 'auto',
    marginTop: 10,
  }
}));

const FormConstructor = (props) => {

  const {
    formConstructorFields,
    addField,
    deleteField,
    setFieldType,
    setFieldName,
    addItemForDropdown,
    setNameForDropdown,
    deleteItemForDropdown,
    sendForm,
    sendFormUpdate,
    formId,
    getForm,
    setName,
    name,
    setFormData
  } = props;

  const classes = useStyles();

  useEffect(() => {
    if(formId) {
      getForm(formId)
    } else {
      setFormData({fields: []})
      setName('')
    }
  }, [formId]);

  const send = () => {
    formId
      ? sendFormUpdate(name, formId)
      : sendForm(name)
  };

  return (
    <div className={classes.container}>
      <TextField
        label="Form name"
        className={classes.textField}
        value={name}
        onChange={ event => setName(event.target.value)}
        margin="normal"
      />
      <div className={classes.formsFields}>
      {
        formConstructorFields
          ? formConstructorFields.map(elem => (
            <Fragment key={elem.id}>
              <NewFormField
                elem={elem}
                deleteField={() => deleteField(elem.id)}
                setType={(type) => {
                  setFieldType({type, id:elem.id})
                }}
                setFieldName={ fieldName => setFieldName({fieldName, id:elem.id}) }
                addItemForDropdown={addItemForDropdown}
                setNameForDropdown={setNameForDropdown}
                deleteItemForDropdown={deleteItemForDropdown}
              />
              <Divider/>
            </Fragment>
          ))
          : null
      }
      </div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={addField}
        disabled={formConstructorFields.length >= 15}
      >
        Add fields
      </Button>
      {
        formConstructorFields.length
          ? (
            <Button
              variant="contained"
              className={classes.button}
              onClick={send}
            >
              Send form
            </Button>
          )
          : null
      }
    </div>
  );
};

const mapStateToProps = (store) => ({
  formConstructorFields: formConstructorSelector(store),
  form: fillingFormSelector(store),
  name: formNameSelector(store),
});
const mapDispatchToProps = ({
  addField,
  deleteField,
  setFieldType,
  setFieldName,
  addItemForDropdown,
  setNameForDropdown,
  deleteItemForDropdown,
  sendNewForm,
  sendFormUpdate,
  getForm,
  setName,
  setFormData
});

export default connect(mapStateToProps, mapDispatchToProps)(FormConstructor)