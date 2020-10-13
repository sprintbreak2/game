import Loader from './Loader';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { loadingOn, loadingOff } from './../../store/actions/index';

const mapStateToProps = (state) => {
    return {
        loading: state.appReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingOn: () => dispatch(loadingOn()),
        loadingOff: () => dispatch(loadingOff())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loader));