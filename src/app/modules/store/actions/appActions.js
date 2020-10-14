export const loadingOn = () => {
    return function (dispatch) {
        dispatch({ type: 'LOADING_ON' })
    }
}

export const loadingOff = () => {
    return function (dispatch) {
        dispatch({ type: 'LOADING_OFF' })
    }
}
 