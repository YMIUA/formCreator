import { handleActions, createAction } from 'redux-actions';
import axios from 'axios'
import { API } from './../../constants'

export const FORM_LOADED = 'FILLS/FORM_LOADED';
export const CHANGE_LOAD_STATUS = 'FILLS/CHANGE_LOAD_STATUS';
export const SAVE_FILLS = 'FILLS/SAVE_FILLS';

export const REDUCER_NAME = 'fills';

const initialState = {
  isLoaded: false,
  isLoading: false,
  fills: [],
};

const setFormLoaded = createAction(FORM_LOADED);
const saveFills = createAction(SAVE_FILLS);
const changeLoadStatus = createAction(CHANGE_LOAD_STATUS);

export const getFillsData = formId => async (dispatch) => {
  dispatch(changeLoadStatus(true));
  // axios.get( `${API}/fills/${formId}`)
  axios.get( `http://forms-app.brutgroot.com/shpax/fills/1`)
    .then(response => {
      dispatch(saveFills(response.data));
      dispatch(setFormLoaded())
    })
    .catch(() =>
      console.log("error load data")
    ).finally(()=>{
    dispatch(changeLoadStatus(false))
  })
};

export default handleActions({
  [saveFills]: (state, { payload }) => ({
    ...state,
    fills: payload
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


export const fillsSelector = state => state[REDUCER_NAME];