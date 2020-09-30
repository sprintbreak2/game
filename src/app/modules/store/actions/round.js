import config from '../../../config/config';

export const action = "ROUND"

export const types = {
    ROUND_NEW: `${action}.NEW`,
    SELECT_CARD: `${action}.SELECT_CARD`,
    SUBMIT_CARD: `${action}.SUBMIT_CARD`,
    SUBMIT_CARD_ERROR: `${action}.SUBMIT_CARD`,
    SUBMIT_WINNER: `${action}.SUBMIT_WINNER`,
    SUBMIT_WINNER_ERROR: `${action}.SUBMIT_WINNER`,
    CARD_SUBMITTED: `${action}.CARD_SUBMITTED`,
    WINNER_SUBMITTED: `${action}.WINNER_SUBMITTED`
}

export function actionNewRound(data, props) {
    return function (dispatch) {
        dispatch({ type: types.ROUND_NEW, payload: { id: props.id, data } })
    }
}

export function actionCardSubmitted(data, props) {
    return function (dispatch) {
        dispatch({ type: types.CARD_SUBMITTED, payload: { id: props.id, data } })
    }
}

export function actionWinnerSubmitted(data, props) {
    return function (dispatch) {
        dispatch({ type: types.WINNER_SUBMITTED, payload: { id: props.id, data } })
    }
}

export function actionSelectCard(id, card) {
    return function (dispatch) {
        dispatch({ type: types.SELECT_CARD, payload: { id, card } })
    }
}

export function actionSubmitCard(id, room_id, card_id) {
    console.log("Post /choose-card:", { id, room_id, card_id })
    return function (dispatch) {
        return fetch(`${config.api.url}/choose-card`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id, room_id, card_id })
        })
            .then(response => response.json())
            .then(json => {
                //console.log("json:",json)
                dispatch({ type: types.SUBMIT_CARD, payload: { response: json, id, status: "" } });
            }).catch((error) => {
                dispatch({ type: types.SUBMIT_CARD_ERROR, payload: { id, error } });
            })
    };
}

export function actionSubmitWinner(id, room_id, card_id) {
    console.log("Post /choose-winner:", { id, room_id, card_id })
    return function (dispatch) {
        return fetch(`${config.api.url}/choose-winner`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id, room_id, card_id })
        })
            .then(response => response.json())
            .then(json => {
                //console.log("json:",json)
                dispatch({ type: types.SUBMIT_WINNER, payload: { response: json, id, status: "" } });
            }).catch((error) => {
                dispatch({ type: types.SUBMIT_WINNER_ERROR, payload: { id, error } });
            })
    };
}

export function reducer(state, action) {
    const json = action.payload.data
    const new_state = {
        players: {
            ...state.players
        }
    }

    if (action.type === types.ROUND_NEW) {
        if (json.player_type === 'hand') {

            new_state.players[action.payload.id] = {
                ...new_state.players[action.payload.id],
                red_card: json.red_card,
                white_cards: [],
                date_limit: json.date_limit,
                players: json.players,
                type: 'Hand',
                status: "Playing",
                selected_card: 0,
                submitted: false,
                winner: null,
                round_limit: json.round_limit,
                choose_card_limit: json.choose_card_limit,
                choose_winner_limit: json.choose_winner_limit,
                accumulated_points: json.accumulated_points
            }
            console.log("Hand:",new_state)

        } else if (json.player_type === 'player') {

            new_state.players[action.payload.id] = {
                ...new_state.players[action.payload.id],
                red_card: json.red_card,
                white_cards: json.cards,
                date_limit: json.date_limit,
                players: json.players,
                type: 'Player',
                status: "Playing",
                selected_card: 0,
                submitted: false,
                winner: null,
                round_limit: json.round_limit,
                choose_card_limit: json.choose_card_limit,
                choose_winner_limit: json.choose_winner_limit,
                accumulated_points: json.accumulated_points
            }
        }

    }
    if (action.type === types.SELECT_CARD) {
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            selected_card: action.payload.card
        }
    }
    if (action.type === types.CARD_SUBMITTED) {
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            white_cards: new_state.players[action.payload.id].white_cards.concat(json.card),
        }
    }
    if (action.type === types.WINNER_SUBMITTED) {
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            submitted: true,
            winner: {
                card: json.card,
                player: json.winner
            }
        }
    }

    if (action.type === types.SUBMIT_CARD) {
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            submitted: true
        }
    }
    if (action.type === types.SUBMIT_WINNER) {
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            submitted: true
        }
    }
    return new_state
}
