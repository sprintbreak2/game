import config from '../../../config/config';

export const action = "LOGIN"

export const types = {
    AUTHENTICATE_PLAYER_ACTION: `${action}.AUTHENTICATE`,
    LOGIN_OK: `${action}.OK`,
    LOGIN_ERROR: `${action}.ERROR`,
    CLIENT_ALREADY_LOGGED: `${action}.ALREADY_LOGGED`,
}

export function actionLogin(id) {
    console.log("Post /login:", { id })
    return function (dispatch) {
        return fetch(`${config.api.url}/login`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id, password: id })
        })
            .then(response => response.json())
            .then(json => {
                console.log("Received:", json)
                dispatch({
                    type: types.LOGIN_OK, 
                    payload: {
                        id,
                        response: json,
                        status: "Logged",
                        logged: true
                    }
                });
            }).catch((error) => {
                dispatch({ type: types.LOGIN_ERROR, payload: { id, error } });
            })
    };
}



export function actionAuthenticateWs(id, ws) {
    return function (dispatch) {
        ws.sendMessage(JSON.stringify({ type: 'AUTHENTICATE', id }))
    }
}

export function reducer(state, action) {
    console.log("Action type:", action.type)
    if (action.type === types.LOGIN_OK) {
        const new_players = {
            ...state.players
        }
        const player = new_players[action.payload.id]
        player.status = action.payload.status
        player.logged = action.payload.logged
        player.points = action.payload.response.points
        player.superpoints = action.payload.response.superpoints

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
    return state
}
