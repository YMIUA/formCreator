import { handleActions, createAction } from 'redux-actions';
import axios from "axios";
import {API} from "../../constants";
import { setName } from "./formName";

export const SET_LOADING_STATUS = 'FILLING_FORM/SET_LOADING_STATUS';
export const SET_LOAD_STATUS = 'FILLING_FORM/SET_LOAD_STATUS';
export const SAVE_LOAD_DATA = 'FILLING_FORM/SAVE_LOAD_DATA';
export const SET_FIELD_VALUE = 'FILLING_FORM/SET_FIELD_VALUE';

export const setLoadingStatus = createAction(SET_LOADING_STATUS);
export const setLoadStatus = createAction(SET_LOAD_STATUS);
export const saveLoadData = createAction(SAVE_LOAD_DATA);
export const setFieldValue = createAction(SET_FIELD_VALUE);

export const REDUCER_NAME = 'fillingForm';

const initialState = {
  isLoaded: false,
  isLoading: false,
  formsData: {},
  fieldValue: {},
};

export const getForm = formId => async (dispatch) => {
  dispatch(setLoadStatus(true));
  axios.get(`${API}/forms/${formId}`)
    .then(response => {
      if(response.status === 200){
        dispatch(setLoadingStatus(true));
        dispatch(saveLoadData(response.data));
        dispatch(setName(response.data.name));
      }
    })
    .catch(() => console.log("ERROR LOADING FORM"))
    .finally( () => {
      dispatch(setLoadStatus(false));
    })
};

export const sendForm = formId => async ( dispatch, getStore ) => {
  axios.post(`${API}/fills/${formId}`,
    {
      fields: {
        ...getStore().fillingForm.fieldValue
      }
    })
    .then(response => {
      console.log('resp',response);
      if(response.status === 200){
        alert('SEND SUCCESSFUL')
      }
    })
    .catch(() => console.log("ERROR SENDING FORM"))
};

export default handleActions({
  [setLoadingStatus]: ( state, { payload } ) => ({
    ...state,
    isLoaded: payload
  }),
  [setLoadStatus]: ( state, { payload } ) => ({
      ...state,
      isLoading: payload
    }
  ),
  [saveLoadData]: ( state, { payload }) => ({
    ...state,
    formsData: payload
  }),
  [setFieldValue]: ( state, { payload }) => ({
    ...state,
    fieldValue: {
      ...state.fieldValue,
      [payload.name]: payload.value
    }
  }),
}, initialState);


export const fillingFormSelector = state => state[REDUCER_NAME];