import { combineReducers} from 'redux'
import authReducer from './authReducer';
import surveysReducers from './surveysReducers.js';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
    auth: authReducer,
    surveys: surveysReducers,
    form: formReducer
});
