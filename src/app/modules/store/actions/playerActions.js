
export function initializePlayer(id) {
    return {
        type: 'INITIALIZE_PLAYER',
        payload: { id }
    }
}

export function updateStats(id, data) {
    return {
        type: 'UPDATE_STATS',
        payload: { id, data }
    }
}

export function updateProfile(id, data) {
    return {
        type: 'UPDATE_PROFILE',
        payload: { id, data }
    }
}

export const setNickname = nickname => {
    return {
        type: 'SET_NICKNAME',
        payload: { nickname }
    }
}