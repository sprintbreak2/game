export const setUsername = username => {
    return {
        type: 'SET_USERNAME',
        payload: { username }
    }
}

export const loginRequest = data => {
    return {
        type: 'LOGIN_REQUEST',
        payload: { data },
    }
}

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const loginFailure = () => {
    return {
        type: 'LOGIN_FAILURE'
    }
}