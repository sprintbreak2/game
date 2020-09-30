import config from '../../../config/config';

export const action = "PLAYER"

export const types = {
    PLAYER_INITIALIZE: `${action}.INITIALIZE`,
    UPDATE_STATS: `${action}.UPDATE_STATS`,
    UPDATE_PROFILE: `${action}.UPDATE_PROFILE`,
}


export function actionInitializePlayer(id) {
    return {
        type: types.PLAYER_INITIALIZE,
        payload: {
            id,
            red_card: { content: "" },
            white_cards: [],
            points: "",
            superpoints: "",
            status: "Initialized",
            type: "",
            logged: false,
            selected_card: 0,
            winner: null,
            round_limit: "",
            choose_card_limit: "",
            choose_winner_limit: ""
        }
    }
}

export function actionUpdateStats(id, data) {
    return {
        type: types.UPDATE_STATS,
        payload: { id, data }
    }
}

export function actionUpdateProfile(id, data) {
    return {
        type: types.UPDATE_PROFILE,
        payload: { id, data }
    }
}

export function reducer(state, action) {
    if (action.type === types.PLAYER_INITIALIZE) {
        const new_players = {
            ...state.players
        }
        new_players[action.payload.id] = action.payload

        return Object.assign({}, state, {
            players: new_players
        })
    }
    if (action.type === types.UPDATE_STATS) {
        const new_players = {
            ...state.players
        }
        new_players[action.payload.id] = {
            ...new_players[action.payload.id],
            points: action.payload.data.points,
            superpoints: action.payload.data.superpoints
        }

        return {
            players: new_players
        }
    }
    if (action.type === types.UPDATE_PROFILE) {
        
    }

    return state
}
