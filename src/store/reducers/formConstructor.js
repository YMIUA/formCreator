import { handleActions, createAction } from 'redux-actions';
import axios from 'axios'
import { API } from './../../constants'
import {setName} from "./formName";

export const ADD_FIELD = 'FORM_CONSTRUCTOR/ADD_FIELD';
export const DELETE_FIELD = 'FORM_CONSTRUCTOR/DELETE_FIELD';
export const SET_FIELD_NAME = 'FORM_CONSTRUCTOR/SET_FIELD_NAME';
export const SET_FIELD_TYPE = 'FORM_CONSTRUCTOR/SET_FIELD_TYPE';
export const ADD_ITEM_FOR_DROPDOWN = 'FORM_CONSTRUCTOR/ADD_ITEM+FOR_DROPDOWN';
export const DELETE_ITEM_FOR_DROPDOWN = 'FORM_CONSTRUCTOR/DELETE_ITEM_FOR_DROPDOWN';
export const SET_NAME_FOR_DROPDOWN = 'FORM_CONSTRUCTOR/SET_NAME_FOR_DROPDOWN';
export const SET_FORM_DATA = 'FORM_CONSTRUCTOR/SET_FORM_DATA';

export const REDUCER_NAME = 'formConstructor';

const initialState = [];

export const addField = createAction(ADD_FIELD);
export const deleteField = createAction(DELETE_FIELD);
export const setFieldName = createAction(SET_FIELD_NAME);
export const setFieldType = createAction(SET_FIELD_TYPE);
export const addItemForDropdown = createAction(ADD_ITEM_FOR_DROPDOWN);
export const deleteItemForDropdown = createAction(DELETE_ITEM_FOR_DROPDOWN);
export const setNameForDropdown = createAction(SET_NAME_FOR_DROPDOWN);
export const setFormData = createAction(SET_FORM_DATA);

export const sendNewForm = name => async ( dispatch, getState) => {
  axios.post(`${API}/forms/new`,{
    name,
    fields: getState()[REDUCER_NAME]
  })
  .then( response => {
    console.log(response);
    if(response.status === 200){
      alert("send successfully")
    }
  })
};

export const sendFormUpdate = ( name, id ) => async ( dispatch, getState) => {
  axios.put(`${API}/forms/${id}`,{
    name,
    fields: getState()[REDUCER_NAME]
  })
  .then( response => {
    console.log(response);
    if(response.status === 200){
      alert("update successfully")
    }
  })
};

export const getForm = formId => async (dispatch) => {
  axios.get(`${API}/forms/${formId}`)
    .then(response => {
      if(response.status === 200){
        dispatch(setFormData(response.data));
        dispatch(setName(response.data.name));
      }
    })
    .catch(() => console.log("ERROR LOADING FORM"))
};

let fieldId = 0;

export default handleActions({
  [addField]: (state) => ([
    ...state,
    {
      type: 'text',
      id: fieldId++,
      fieldName: '',
    },
  ]),
  [deleteField]: (state, { payload }) => (
      state.filter(item => item.id !== payload)
  ),
  [setFieldType]: (state, { payload }) => {
    if( payload.type !== 'dropdown' && payload.type !== 'checkmark' ){
      return state.map( item =>
        item.id === payload.id ? {...item, type: payload.type, placeholder: "" } : item
      )
    } else {
     return  state.map( item =>
        item.id === payload.id ? {
          ...item,
          type: payload.type,
          items:[{
            name: "",
            value: "",
            id: fieldId++
          }],
          default: 0
        } : item
      )
    }
  },
  [setFieldName]: (state, { payload }) => (
    state.map((item) =>
      item.id === payload.id ? {...item, fieldName: payload.fieldName, placeholder: payload.fieldName } : item
    )
  ),
  [addItemForDropdown]: (state, { payload }) => (
    state.map((fields) => {
      if(payload === fields.id){
        return({ ...fields, items:[...fields.items, {name:'', value:'', id: fieldId++}]})
      } else {
        return { ...fields }
      }
    })
  ),
  [deleteItemForDropdown]: (state, { payload }) => (
     state.map((field) => {
       if(field.id === payload.id){
         const newArr = [...field.items].filter((elem, index) => index !== payload.index);
         return ({...field, items: [...newArr]})
       } else {
         return { ...field }
       }
     })
  ),
  [setNameForDropdown]: (state, { payload }) => (
      state.map((field) => {
        if(field.id === payload.id){
          const newArr = [...field.items].map((elem, index) => (
            index === payload.index
              ? ({...elem, name: payload.value})
              : {...elem})
          );
          return ({...field, items: [...newArr]})
        } else {
          return { ...field }
        }
      })
  ),
  [setFormData]: (state, { payload }) => {
    return [...payload.fields]
  }
}, initialState);


export const formConstructorSelector = state => state[REDUCER_NAME];