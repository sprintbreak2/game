import config from '../../../config/config'

export function newRound(data, props) {
    console.log('Action newRound')
    return function (dispatch) {
        dispatch({ type: 'ROUND_NEW', payload: { id: props.id, data } })
    }
}

export function cardSubmitted(data, props) {
    return function (dispatch) {
        dispatch({ type: 'CARD_SUBMITTED', payload: { id: props.id, data } })
    }
}

export function winnerSubmitted(data, props) {
    return function (dispatch) {
        dispatch({ type: 'WINNER_SUBMITTED', payload: { id: props.id, data } })
    }
}

export function selectCard(id, card) {
    return function (dispatch) {
        dispatch({ type: 'SELECT_CARD', payload: { id, card } });
    }
}

export function submitCard(id, session, room_id, card_id) {
    return function (dispatch) {
        return fetch(`${config.api.url}/choose-card`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-id': session.user_id,
                'x-session-type': session.origin,
                'x-token': session.token
            },
            body: JSON.stringify({ id: session.user_id, room_id, card_id })
        })
        .then(response => response.json())
        .then(json => {
            dispatch({ type: 'SUBMIT_CARD', payload: { response: json, id, status: '' } })
        })
        .catch(error => {
            dispatch({ type: 'SUBMIT_CARD_ERROR', payload: { id, error }})
        })
    }
}

export function submitWinner(id, session, room_id, card_id) {
    return function (dispatch) {
        return fetch(`${config.api.url}/choose-winner`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-id': session.user_id,
                'x-session-type': session.origin,
                'x-token': session.token
            },
            body: JSON.stringify({ id: session.user_id, room_id, card_id })
        })
        .then(response => response.json())
        .then(json => {
            dispatch({ type: 'SUBMIT_WINNER', payload: { response: json, id, status: '' } })
        })
        .catch(error => {
            dispatch({ type: 'SUBMIT_WINNER_ERROR', payload: { id, error } })
        })
    }
}