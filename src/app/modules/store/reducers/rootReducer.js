import { login, player, room, round } from "../actions/index"

const initialState = {
    players: {}
};

function rootReducer(state = initialState, action) {
    console.log("Reducer Action type:", action.type)
    const action_selector = action.type.replace(/\..*/,'')
    if(action_selector === login.action){
        return login.reducer(state, action)
    } else if(action_selector === player.action){
        return player.reducer(state, action)
    } else if(action_selector === room.action){
        return room.reducer(state, action)
    } else if(action_selector === round.action){
        return round.reducer(state, action)
    }

    return state;
}

export default rootReducer;