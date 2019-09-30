import { handleActions, createAction } from 'redux-actions';

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

export const sendForm = () => async (dispatch) => {
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
    if( payload.type !== 'dropdown'){
      return state.map( item =>
        item.id === payload.id ? {...item, type: payload.type } : item
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
      item.id === payload.id ? {...item, fieldName: payload.fieldName } : item
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
     state.map((fields) => {
       console.log('payload', payload)
       if(payload === fields.id){
         const newArr = [...fields.items].filter((elem, index) => index !== payload);
         return ({...fields, items: [...newArr]})
       } else {
         return { ...fields }
       }

     })
  ),
  [setNameForDropdown]: (state, { payload }) => (
    state.map((fields) => {
      if(fields.id === payload.id){
        return fields
      } else {
        const newArr = [...fields.items];
        newArr[payload.index].value = payload.value;
        newArr[payload.index].name = payload.value;
        return({ ...fields, items:[...newArr]})
      }
    })
  ),

}, initialState);


export const formConstructorSelector = state => state[REDUCER_NAME];