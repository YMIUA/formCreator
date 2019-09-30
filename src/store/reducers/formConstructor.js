import { handleActions, createAction } from 'redux-actions';
import axios from 'axios'
import { API } from './../../constants'

export const ADD_FIELD = 'ALL_FORMS/ADD_FIELD';
export const DELETE_FIELD = 'ALL_FORMS/DELETE_FIELD';
export const SET_FIELD_NAME = 'ALL_FORMS/SET_FIELD_NAME';
export const SET_FIELD_TYPE = 'ALL_FORMS/SET_FIELD_TYPE';
export const ADD_ITEM_FOR_DROPDOWN = 'ALL_FORMS/ADD_ITEM+FOR_DROPDOWN';
export const DELETE_ITEM_FOR_DROPDOWN = 'ALL_FORMS/DELETE_ITEM_FOR_DROPDOWN';
export const SET_NAME_FOR_DROPDOWN = 'ALL_FORMS/SET_NAME_FOR_DROPDOWN';

export const REDUCER_NAME = 'formConstructor';

const initialState = [];

export const addField = createAction(ADD_FIELD);
export const deleteField = createAction(DELETE_FIELD);
export const setFieldName = createAction(SET_FIELD_NAME);
export const setFieldType = createAction(SET_FIELD_TYPE);
export const addItemForDropdown = createAction(ADD_ITEM_FOR_DROPDOWN);
export const deleteItemForDropdown = createAction(DELETE_ITEM_FOR_DROPDOWN);
export const setNameForDropdown = createAction(SET_NAME_FOR_DROPDOWN);

export const sendForm = name => async ( dispatch, getState) => {
  console.log('getState', getState()[REDUCER_NAME])
  console.log('formName', name)
  axios.post(`${API}/forms/new`,{
    name,
    fields: getState()[REDUCER_NAME]
  })
  .then( response => {
    console.log(response);
  })
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
}, initialState);


export const formConstructorSelector = state => state[REDUCER_NAME];