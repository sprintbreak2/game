import { saveEntity } from '../services/WithReduxStateServices'

export const HANDLE_CHANGE = 'HANDLE_CHANGE'
export const SEND_INFO_OK = 'SEND_INFO_OK'
export const API_ERROR = 'API_ERROR'

export function handleChange(value) {
    return function (dispatch, getState) {
        // maybe you want to use some data from the redux state
        // const { valueToShowInReadComponent } = getState().withReduxState;
        dispatch({ type: HANDLE_CHANGE, value: value })
    }
}

export function callApi() {
    return async function (dispatch) {
        const { data, error } = await saveEntity({
            id: 1,
            name: 'pepe'
        })
        // remember to see AxiosConfig to understand who is who
        if (data) {
            // Do some stuff with data and (almost always) dispatch actions
            dispatch({
                type: SEND_INFO_OK,
                value: data
            })
        } else {
            // handle the error
            dispatch({
                type: API_ERROR,
                value: error
            })
        }
    }
}
