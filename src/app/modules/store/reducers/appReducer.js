const INITIAL_STATE = {
    username: null,
    error: null,
    userData: {},
    isLogged: false,
}

export function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_USERNAME': {
            const { username } = action.payload;
            return {
                ...state,
                username,
            }
        }
        case 'LOGIN_REQUEST': {
            const { data } = action.payload;
            return {
                ...state,
                userData: data,
            }
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                isLogged: true,
            }
        }
        case 'LOGIN_FAILURE': {
            return {
                ...state,
                isLogged: false,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}