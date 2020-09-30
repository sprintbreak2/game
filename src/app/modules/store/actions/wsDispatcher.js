import config from '../../../config/config';
import { login, player, room, round } from "../actions/index"


export const action = "WS_DISPATCHER"

export const types = {
}

export function actionAuthenticateWs(id, ws) {
    return function (dispatch) {
        console.log("Sending authenticate")
        ws.sendMessage(JSON.stringify({ type: 'AUTHENTICATE', id }))
    }
}

export function actionDispatch(id, message, { props, ws }) {
    let json
    try{
        json = JSON.parse(message)
    }catch(error){
        console.log(error)
        return error
    }
    console.log("Dispatching:", json)
    if(json.type === 'AUTHENTICATION_REQUEST'){
        return actionAuthenticateWs(id, ws)
    }
    if(json.type === 'NEW_ROUND'){
        return round.actionNewRound(json, props)
    }
    if(json.type === 'PLAYER_CARD_SUBMITTED'){
        return round.actionCardSubmitted(json, props)
    }
    if(json.type === 'WINNER_SUBMITTED'){
        return round.actionWinnerSubmitted(json, props)
    }
    if(json.type === 'CLOSE_ROOM'){
        return room.actionRoomClosed(id, json)
    }
    if(json.type === 'UPDATE_STATS'){
        return player.actionUpdateStats(id, json)
    }
    if(json.type === 'UPDATE_PROFILE'){
        return player.actionUpdateProfile(id, json)
    }
}

function reducer(state, action) {
    return state
}

export default reducer