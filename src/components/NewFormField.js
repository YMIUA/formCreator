import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import { Radio, RadioGroup, FormControlLabel, FormLabel, Button, TextField, Select, MenuItem } from '@material-ui/core';
import {deleteItemForDropdown} from "../store/reducers/formConstructor";

const useStyles = makeStyles({
  container: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionInput: {
    width: '55%',
  },
  questionType: {
    width: '30%',
    alignSelf: 'flex-end',
  },
  descriptionDropdown: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
    marginLeft: 30,
    width: 60,
  },
  descriptionDropdownItem: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'flex-end',
    marginTop: 10,
  },
  inputDropdown: {
    width: "85%"
  }
});

const NewFormField = props => {

  const {
    elem: { type, fieldName, items, id },
    deleteField,
    setType,
    setFieldName,
    addItemForDropdown,
    setNameForDropdown,
    deleteItemForDropdown
  } = props;

  const classes = useStyles();

  const handleChange = event => {
    setType(event.target.value);
  };

  return (
    <>
      <div className={classes.container}>
        <TextField
          label="Set field question"
          value={fieldName}
          onChange={ event => setFieldName(event.target.value)}
          className={classes.questionInput}
        />
        <Select
          value={type}
          onChange={handleChange}
          className={classes.questionType}
        >
          <MenuItem value="text" >Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="dropdown">Dropdown</MenuItem>
          <MenuItem value="checkmark">Checkmark</MenuItem>
        </Select>
        <Button onClick={deleteField}>
          <DeleteForeverIcon/>
        </Button>
      </div>
      <div className={classes.description}>
        {
          type === 'text' &&
          <p>Text input</p>
        }
        {
          type === 'number' &&
          <p>Number input</p>
        }
        {
          type === 'dropdown' &&
          <div className={classes.descriptionDropdown}>
            {
              items.map((dropItem, index ) => (
                <div className={classes.descriptionDropdownItem} key={index}>
                  <CheckBoxOutlineBlankIcon/>
                  <TextField
                    value={dropItem.name}
                    className={classes.inputDropdown}
                    onChange={ event => setNameForDropdown({ id, index, value: event.target.value})}
                  />
                  <Button
                    onClick={() => deleteItemForDropdown({ index, id })}
                  >
                    <CloseIcon/>
                  </Button>
                </div>
                )
              )
            }
            <Button
              variant="contained"
              onClick={() => addItemForDropdown(id)}
              className={classes.button}
            >
              <AddIcon/>
            </Button>
          </div>
        }
        {
          type === 'checkmark' &&
          <div className={classes.descriptionDropdown}>
            {
              items.map((dropItem, index ) => (
                  <div className={classes.descriptionDropdownItem} key={index}>
                    <CheckBoxOutlineBlankIcon/>
                    <TextField
                      value={dropItem.name}
                      className={classes.inputDropdown}
                      onChange={ event => setNameForDropdown({ id, index, value: event.target.value})}
                    />
                    <Button
                      onClick={() => deleteItemForDropdown({ index, id })}
                    >
                      <CloseIcon/>
                    </Button>
                  </div>
                )
              )
            }
            <Button
              variant="contained"
              onClick={() => addItemForDropdown(id)}
              className={classes.button}
            >
              <AddIcon/>
            </Button>
          </div>
        }
      </div>
    </>

  );
}

export default NewFormField;
