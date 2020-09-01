import { connect } from 'react-redux'
import Home from './WithReduxState'
import { withRouter } from 'react-router-dom'

import { handleChange, callApi } from '../redux/Actions'

const mapStateToProps = (state, ownProps) => ({
    value: state.withReduxState.valueToShowInReadComponent,
    valueToShowInReadComponent: state.withReduxState.valueToShowInReadComponent
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleChange: (value) => {
        dispatch(handleChange(value))
    },
    callApi: () => {
        dispatch(callApi())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
