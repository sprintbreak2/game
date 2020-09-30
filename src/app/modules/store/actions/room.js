import config from '../../../config/config';

export const action = "ROOM"

export const types = {
    ROOM_JOINED: `${action}.JOINED`,
    ROOM_NOT_JOINED: `${action}.JOINED`,
    ROOM_CLOSED: `${action}.CLOSED`,
    ROOM_LEAVED: `${action}.LEAVED`,
}

export function actionRoomClosed(id, data) {
    return function (dispatch) {
        dispatch({ type: types.ROOM_CLOSED, payload: { id, data } })
    }
}

export function actionJoinRoom(id) {
    console.log("Post /enter-room:", { id })
    return function (dispatch) {
        return fetch(`${config.api.url}/enter-room`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(json => {
                //console.log("json:",json)
                dispatch({ type: types.ROOM_JOINED, payload: { response: json, id, status: "Joined" } });
            }).catch((error) => {
                dispatch({ type: types.ROOM_NOT_JOINED, payload: { id, error } });
            })
    };
}

export function actionLeaveRoom(id) {
    console.log("Post /leave-room:", { id })
    return function (dispatch) {
        return fetch(`${config.api.url}/leave-room`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id })
        })
            .then(response => response.json())
            .then(json => {
                //console.log("json:",json)
                dispatch({ type: types.ROOM_LEAVED, payload: { response: json, id, status: "Leaved" } });
            }).catch((error) => {
                //dispatch({ type: "ROOM_NOT_JOINED", payload: { id, error } });
            })
    };
}

export function reducer(state, action) {
    if (action.type === types.ROOM_JOINED) {

        const new_players = {
            ...state.players
        }
        const player = new_players[action.payload.id]
        player.status = action.payload.status
        player.room = action.payload.response.room_id

        /*if(action.payload.id ==="1"){
            console.log(action.type)
            console.log(action.payload)
            console.log("Player: ", player)
            console.log(new_players)
        }*/
        return Object.assign({}, state, {
            players: new_players
        })
    }
    if (action.type === types.ROOM_CLOSED) {
        const json = action.payload.data
        const new_state = {
            players: {
                ...state.players
            }
        }
        new_state.players[action.payload.id] = {
            ...new_state.players[action.payload.id],
            status: "Closed",
            accumulated_points:0
        }
        return new_state
    }
    return state
}
