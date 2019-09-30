import { combineReducers } from 'redux';
import allForms  from './allForms'
import formConstructor from './formConstructor'

export default combineReducers({
    allForms,
    formConstructor
});