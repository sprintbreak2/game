import { connect } from 'react-redux'
import Spinner from '@santander/everest-ui/lib/Spinner'
import { withRouter } from 'react-router-dom'

import { loadingOn, loadingOff } from './redux/Action'

const mapStateToProps = (state) => ({
    loading: state.loader.loading
    // loader: {loading: state.loader.loading}
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadingOn: () => {
        dispatch(loadingOn())
    },
    loadingOff: () => {
        dispatch(loadingOff())
    }
})

const Container = connect(mapStateToProps, mapDispatchToProps)(Spinner)
export default withRouter(Container)
