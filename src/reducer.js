import { combineReducers } from 'redux';
import { loginReducer } from './app/modules/store/reducers/loginReducer';
import rootReducer from './app/modules/store/reducers/rootReducer';

export default combineReducers({
    rootReducer,
    loginReducer
})
