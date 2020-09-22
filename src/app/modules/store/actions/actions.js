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