import React, { useState, Fragment } from 'react';
import { TextField , Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import NewFormField from './../components/NewFormField';
import {
  formConstructorSelector,
  addField,
  setFieldType,
  setFieldName,
  deleteField,
  addItemForDropdown,
  setNameForDropdown,
  deleteItemForDropdown
} from "../store/reducers/formConstructor";

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

const NewFormConstructor = (props) => {

  const {
    formConstructorFields,
    addField,
    deleteField,
    setFieldType,
    setFieldName,
    addItemForDropdown,
    setNameForDropdown,
    deleteItemForDropdown
  } = props;

  const classes = useStyles();

  const [formName, changeFormName] = useState("");

  console.log(formConstructorFields)

  return (
    <div className={classes.container}>
      <TextField
        label="Form name"
        className={classes.textField}
        value={formName}
        onChange={ event => changeFormName(event.target.value)}
        margin="normal"
      />
      <div className={classes.formsFields}>
      {
        formConstructorFields.map(elem => (
          <Fragment key={elem.id}>
            <NewFormField
              elem={elem}
              deleteField={() => deleteField(elem.id)}
              type={elem.type}
              setType={(type) => {
                setFieldType({type, id:elem.id})
              }}
              fieldName={elem.fieldName}
              setFieldName={ fieldName => setFieldName({fieldName, id:elem.id}) }
              addItemForDropdown={addItemForDropdown}
              setNameForDropdown={setNameForDropdown}
              deleteItemForDropdown={deleteItemForDropdown}
            />
            <Divider/>
          </Fragment>
        ))
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

    </div>
  );
};

const mapStateToProps = (store) => ({
  formConstructorFields: formConstructorSelector(store),
});
const mapDispatchToProps = ({
  addField,
  deleteField,
  setFieldType,
  setFieldName,
  addItemForDropdown,
  setNameForDropdown,
  deleteItemForDropdown
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFormConstructor)