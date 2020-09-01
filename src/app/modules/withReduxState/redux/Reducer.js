import { HANDLE_CHANGE } from './Actions'

const initialState = {
    valueToShowInReadComponent: undefined
}

function WithReduxState(state = initialState, action) {
    switch (action.type) {
        case HANDLE_CHANGE: {
            return {
                ...state,
                valueToShowInReadComponent: action.value
            }
        }

        default:
            return state
    }
}

export default WithReduxState
