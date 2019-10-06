import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '80%',
    margin: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  }
}));

const FillingForm = ({ isLoading, form, setFieldValue, fieldValue, sendForm }) => {

  const classes = useStyles();
  const { id, fields } = form;

  const getCurrentTypeInput = question => {

    const handleChange = event => {
      setFieldValue({name: question.fieldName, value: event.target.value})
    };

    switch (question.type) {
      case 'text' :
        return (
          <TextField
            className={classes.input}
            value={((typeof(fieldValue.name) !== 'undefined') || fieldValue.name)}
            onChange={handleChange}
          />
        );
      case 'number' :
        return (
          <TextField
            type='number'
            className={classes.input}
            value={((typeof(fieldValue.name) !== 'undefined') || fieldValue.name)}
            onChange={handleChange}
          />
        );
      case 'dropdown' :
        return (
          <Select
            value={fieldValue[question.fieldName]}
            className={classes.input}
            onChange={handleChange}
          >
            {
              question.items.map(menuItem =>
                <MenuItem key={menuItem.id} value={menuItem.name}>{menuItem.name}</MenuItem>
              )
            }
          </Select>
        );
      case 'checkmark' :
        return (
          <RadioGroup onChange={handleChange}>
            {
              question.items.map(item => (
                <FormControlLabel value={item.name} control={<Radio />} label={item.name} />
              ))
            }
          </RadioGroup>
        );
      default: return null
    }
  };

  if(isLoading){
    return <p>Loading...</p>
  }

  if(typeof id === 'undefined'){
    return null
  }

  if(Array.isArray(fields)){
    return (
      <div className={classes.container}>

        {
          fields.map((question)=>(
            <div key={question.id}>
              <p>{question.fieldName}</p>
              {
                getCurrentTypeInput(question)
              }
              {/*<Divider/>*/}
            </div>
          ))
        }
        <Button
          className={classes.button}
          onClick={sendForm}
        >
          Send form
        </Button>
      </div>
    )
  }

  return <p>no form date</p>
};

export default FillingForm