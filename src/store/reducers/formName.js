import { handleActions, createAction } from 'redux-actions';

export const SET_NAME = 'FILLING_FORM/SET_NAME';

export const setName = createAction(SET_NAME);

export const REDUCER_NAME = 'formName';

const initialState = '';

export default handleActions({
  [setName]: ( state, { payload } ) => (payload),
}, initialState);


export const formNameSelector = state => state[REDUCER_NAME];