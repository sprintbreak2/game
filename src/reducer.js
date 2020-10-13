import { combineReducers } from 'redux';
import { appReducer } from './app/modules/store/reducers/appReducer';
import rootReducer from './app/modules/store/reducers/rootReducer';

export default combineReducers({
    appReducer,
    rootReducer
})
