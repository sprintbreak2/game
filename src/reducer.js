import { combineReducers } from 'redux';
import loader from './app/shared/components/loader/redux/Reducer';
import { appReducer } from './app/modules/store/reducers/appReducer';

export default combineReducers({
    loader,
    appReducer
})
