import { messageNew } from './chatActions'
import { updateProfile, updateStats } from './playerActions'
import { roomClosed } from './roomActions'
import { newRound, cardSubmitted, winnerSubmitted } from './roundActions'

export const action = "WS_DISPATCHER"

export function authenticateWs(id, ws, session) {
    console.log('authenticateWs session: ', session);
    if (!session || !session.id) return function (dispatch) { console.log('Missing session') }
    return function (dispatch) {
        const data ={ type: 'AUTHENTICATE', id: session.id }
        console.log("Sending authenticate", data)
        ws.sendMessage(JSON.stringify(data))
    }
}

export function wsDispatch(id, message, { props, ws }) {
    console.log('wsDispatch props: ', props);
    let json
    try {
        json = JSON.parse(message)
    } catch (error) {
        console.log(error)
        return error
    }
    console.log("Dispatching:", json)
    if (json.type === 'AUTHENTICATION_REQUEST') {
        return authenticateWs(id, ws, props.session)
    }
    if (json.type === 'NEW_ROUND') {
        return newRound(json, props)
    }
    if (json.type === 'PLAYER_CARD_SUBMITTED') {
        return cardSubmitted(json, props)
    }
    if (json.type === 'WINNER_SUBMITTED') {
        return winnerSubmitted(json, props)
    }
    if (json.type === 'CLOSE_ROOM') {
        return roomClosed(id, json)
    }
    if (json.type === 'UPDATE_STATS') {
        return updateStats(id, json)
    }
    if (json.type === 'UPDATE_PROFILE') {
        return updateProfile(id, json)
    }
    if (json.type === 'NEW_MESSAGE') {
        return messageNew(id, json)
    }
}