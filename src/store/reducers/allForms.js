import { handleActions, createAction } from 'redux-actions';
import axios from 'axios'

export const FORM_LOADED = 'ALL_FORMS/FORM_LOADED';
export const CHANGE_LOAD_STATUS = 'ALL_FORMS/CHANGE_LOAD_STATUS';
export const RESPONSE_FORMS = 'ALL_FORMS/RESPONSE_DATA';

export const REDUCER_NAME = 'allForms';

const initialState = {
  isLoaded: false,
  isLoading: false,
  forms: [],
};

const setFormLoaded = createAction(FORM_LOADED);
const fetchFormsResponse = createAction(RESPONSE_FORMS);
const changeLoadStatus = createAction(CHANGE_LOAD_STATUS);

export const getFormsData = () => async (dispatch) => {
  dispatch(changeLoadStatus(true));
  axios('http://forms-app.brutgroot.com/shpax/forms/list')
    .then(response => {
      dispatch(fetchFormsResponse(response.data))
      dispatch(setFormLoaded())
    })
    .catch(() =>
      console.log("error load data")
    ).finally(()=>{
      dispatch(changeLoadStatus(false))
  })
};

export default handleActions({
  [fetchFormsResponse]: (state, { payload }) => ({
    ...state,
    forms: payload
  }),
  [setFormLoaded]: state => ({
    ...state,
    isLoaded: true
  }),
  [changeLoadStatus]: (state, { payload }) => ({
    ...state,
    isLoading: payload
  })
}, initialState);


export const allFormsSelector = state => state[REDUCER_NAME];