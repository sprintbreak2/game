import { combineReducers } from 'redux'
import withReduxState from './app/modules/withReduxState/redux/Reducer'
import loader from './app/shared/components/loader/redux/Reducer'

export default combineReducers({
    withReduxState,
    loader
})
