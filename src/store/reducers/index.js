import { combineReducers } from 'redux';
import allForms  from './allForms'
import formConstructor from './formConstructor'
import fillingForm from './fillingForm'
import formName from './formName'
import fills from './fills'

export default combineReducers({
    allForms,
    formConstructor,
    fillingForm,
    formName,
    fills
});