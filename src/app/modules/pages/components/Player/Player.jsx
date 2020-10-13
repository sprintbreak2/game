import React, { Component } from "react";
import { connect } from "react-redux";
import { login, player, room, round, wsDispatcher } from "../../../store/actions/index"
import CardList from './CardList';
import Websocket from 'react-websocket';
import moment from 'moment';
import { GoogleLogin } from 'react-google-login';
import GitHubLogin from 'react-github-login';

class ConnectedForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {
                red_card: { content: "" },
                white_cards: [],
                points: "",
                superpoints: "",
                status: "Initialized",
                type: "",
                logged: false,
                in_room: false,
                selected_card: 0,
                winner: null,
                round_limit: "",
                choose_card_limit: "",
                choose_winner_limit: ""
            },
            login: {
                user: '',
                pass: '',
                email:'',
                fullname: ''
            },
            session: {
                origin: "",
                origin_id: "",
                token: "",
                username: ""
            },
            wsAuthenticated: false,
            register: false
        }
        this.ws = React.createRef();

        if (this.props.id === "1") {
            this.state.login.user = "Gonza"
            this.state.login.pass = "Gonza"
        }
        if (this.props.id === "2") {
            this.state.login.user = "Juanse"
            this.state.login.pass = "Juanse"
        }
        if (this.props.id === "3") {
            this.state.login.user = "Nelson"
            this.state.login.pass = "Nelson"
        }
        if (this.props.id === "4") {
            this.state.login.user = "Carluis"
            this.state.login.pass = "Carluis"
        }

        this.props.initializePlayer(props.id)
    }

    wsOpen() {
        //console.log("Open");
    }

    wsClose(data) {
        //console.log("Close:", data);
    }

    wsData(data) {
        console.log("WS Received", data)
        this.props.dispatchWs(this.props.id, data, { props: this.props, ws: this.ws.current })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onButtonSelect(event) {
        console.log("Selected Card:", event.target.value)
        this.props.selectCard(this.props.id, event.target.value)
    }


    onRoomJoinClick(event) {
        console.log(this.props.info.session);
        this.props.joinRoom(this.props.id, this.props.info.session)
    }
    onRoomLeaveClick(event) {
        this.props.leaveRoom(this.props.id, this.props.info.session)
    }
    onSubmitCardClick(event) {
        this.props.submitCard(this.props.id, this.props.info.session, this.props.info.room, this.props.info.selected_card)
    }
    onSubmitWinnerClick(event) {
        this.props.submitWinner(this.props.id, this.props.info.session, this.props.info.room, this.props.info.selected_card)
    }
    onRegisterClick(event) {
        this.setState({
            ...this.state,
            register: true
        })
    }
    onRegisterOkClick(event) {
        this.setState({
            ...this.state,
            register: false
        })
        this.props.register(this.props.id, {
            data: {
                username: this.state.login.user,
                password: this.state.login.pass,
                email: this.state.login.email,
                fullname: this.state.login.fullname
            }
        })
    }
    onRegisterCancelClick(event) {
        this.setState({
            ...this.state,
            register: false
        })
    }
    

    onSantanderLoginClick(event) {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                origin: "santander",
                username: this.state.user
            }
        })
        this.props.login(this.props.id, {
            origin: 'santander',
            data: {
                username: this.state.login.user,
                password: this.state.login.pass
            }
        },
            this.ws.current).then(() => {
            })

    }
    onGoogleLoginOk(response) {
        console.log(JSON.stringify(response))
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                origin: "google",
                origin_id: response.googleId,
                token: response.idToken
            }
        })
        this.props.login(this.props.id, { origin: 'google', data: response }, this.ws.current)
    }
    onGoogleLoginError(response) {
        console.log(JSON.stringify(response))
    }
    onLogoutClick(event) {
        this.props.logout(this.props.id, this.props.info.session)
    }
    responseFacebook(response) {
        console.log(response);
    }

    onUserChange(event) {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                user: event.target.value
            }
        })
    }
    onPasswordChange(event) {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                pass: event.target.value
            }
        })
    }

    onEmailChange(event) {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                email: event.target.value
            }
        })
    }
    onFullnameChange(event) {
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                fullname: event.target.value
            }
        })
    }

    calculateSecondsLeftTo(round_limit, choose_card_limit, choose_winner_limit) {
        if (!round_limit || !choose_card_limit || !choose_winner_limit) {
            return {
                seconds_to_limit: "?", seconds_to_card_limit: '?', seconds_to_winner_limit: '?'
            }
        }
        const now = moment()
        const data = {
            seconds_to_limit: moment(round_limit).diff(now, 'seconds'),
            seconds_to_card_limit: moment(choose_card_limit).diff(now, 'seconds'),
            seconds_to_winner_limit: moment(choose_winner_limit).diff(now, 'seconds')
        }

        if (data.seconds_to_card_limit > 0) {
            data.seconds_to_winner_limit = moment(choose_winner_limit).diff(choose_card_limit, 'seconds')
        } else {
            data.seconds_to_card_limit = 0
        }

        if (data.seconds_to_winner_limit < 0) {
            data.seconds_to_winner_limit = 0
        }

        return data
    }
    onGithubLoginOk(response) {
        console.log(response)
        this.setState({
            ...this.state,
            login: {
                ...this.state.login,
                origin: "github",
                code: response.code
            }
        })
        const data = {
            ...response
        }
        this.props.login(this.props.id, { origin: 'github', data }, this.ws.current)
    }

    onSuccess(response) { console.log(response) }
    onFailure(response) { console.error(response) }

    render() {
        const { id } = this.props
        let data = this.props.info
        if (!data) data = this.state.info
        const {
            status,
            room,
            points,
            superpoints,
            logged,
            in_room,
            type,
            red_card,
            white_cards,
            selected_card,
            submitted,
            winner,
            round_limit,
            choose_card_limit,
            choose_winner_limit,
            accumulated_points } = data

        const { user, pass, email, fullname } = this.state.login
        const { register } = this.state

        if (id === "1") {
            //console.log("Props:", this.props.info)
            //console.log("State:", this.state.info)
            //console.log(data)
        }

        const secondsLeft = this.calculateSecondsLeftTo(round_limit, choose_card_limit, choose_winner_limit)

        return (

            <div>
                <Websocket url='ws://sprintbreak.nerdear.live/ws'
                    debug={false}
                    reconnect={true}
                    onOpen={this.wsOpen.bind(this)}
                    onClose={this.wsClose.bind(this)}
                    onMessage={this.wsData.bind(this)}
                    ref={this.ws}
                />
                { register && (<div className='register'>
                    <div>
                        <label>*Username:</label>
                        <input id="user" type="text" value={user} onChange={this.onUserChange.bind(this)} />
                    </div>
                    <div>
                        <label>*Password: </label>
                        <input id="pass" type="text" value={pass} onChange={this.onPasswordChange.bind(this)} />
                    </div>
                    <div>
                        <label>*Email: </label>
                        <input id="pass" type="text" value={email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div>
                        <label>*Full Name: </label>
                        <input id="pass" type="text" value={fullname} onChange={this.onFullnameChange.bind(this)} />
                    </div>
                    <button onClick={this.onRegisterOkClick.bind(this)} disabled={logged}>Register User</button>
                    <button onClick={this.onRegisterCancelClick.bind(this)} disabled={logged}>Cancel</button>

                </div>)}
                { !logged && (<div className="login">
                    <div>
                        <label>Username:</label>
                        <input id="user" type="text" value={user} onChange={this.onUserChange.bind(this)} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input id="pass" type="text" value={pass} onChange={this.onPasswordChange.bind(this)} />
                    </div>
                    <button onClick={this.onSantanderLoginClick.bind(this)} disabled={logged}>Santander Login</button>
                    <br />
                    <GoogleLogin
                        buttonText="Google Login"
                        clientId="245942166200-hfb8qrm6m9cgip71l5iuteujhnriidn9.apps.googleusercontent.com"
                        onSuccess={this.onGoogleLoginOk.bind(this)}
                        onFailure={this.onGoogleLoginError.bind(this)}
                        cookiePolicy={'single_host_origin'}
                    /><br />
                    <GitHubLogin clientId="fd748d5a725cf8407786"
                        redirectUri=""
                        onSuccess={this.onGithubLoginOk.bind(this)}
                        onFailure={this.onFailure.bind(this)}
                        buttonText="Github Login" />
                    <br />
                    <button onClick={this.onRegisterClick.bind(this)} disabled={logged}>Register</button>

                </div>)}
                { logged && (<div className="logout">
                    <button onClick={this.onLogoutClick.bind(this)} >Logout</button>
                    <label style={{ marginRight: "10px" }}>Status {status}</label><br />
                </div>)}
                { logged && !in_room && (<div className="room">
                    <button onClick={this.onRoomJoinClick.bind(this)} disabled={!logged}>JOIN ROOM</button>
                </div>)}
                { logged || in_room && (<div className="game">
                    <button onClick={this.onRoomLeaveClick.bind(this)} disabled={!logged}>LEAVE ROOM</button><br />
                    <label style={{ marginRight: "10px" }}>Finish Round {secondsLeft.seconds_to_limit}</label><br />
                    {type === 'Hand' && (<><label style={{ marginRight: "10px" }}>Choose card {secondsLeft.seconds_to_card_limit}</label><br /></>)}
                    {type === 'Player' && (<><label hidden={type === 'Player'} style={{ marginRight: "10px" }}>Choose Winner {secondsLeft.seconds_to_winner_limit}</label><br /></>)}
                    <label >Super points {superpoints}</label><br />
                    <label >Total points {points}</label><br />
                    <label >Round Points {accumulated_points}</label><br />
                    <label htmlFor="title">Player {id}</label><br />
                    <label >Type {type}</label><br />
                    <label >Room {room}</label><br />
                    <label >Red Card: {red_card.content}</label><br />
                    <label >Playing Cards:</label><br />
                    <CardList white_cards={white_cards} handleOnChange={this.onButtonSelect.bind(this)} selectedItem={selected_card} /><br />
                    <button onClick={this.onSubmitCardClick.bind(this)} disabled={selected_card == 0 || submitted} hidden={type === 'Hand'}>Submit Card</button><br />
                    <button onClick={this.onSubmitWinnerClick.bind(this)} disabled={selected_card == 0 || submitted} hidden={type !== 'Hand'}>Submit Winner</button><br />
                    <label hidden={winner == null}>Winner is {winner ? winner.player : ''} with {winner ? winner.card.content : ''}</label><br />
                </div>)}

            </div>
        );
    }
}


function mapStateToProps(state) {
    const { appReducer, rootReducer } = state;
    let info;
    if (rootReducer.players[appReducer.user_id]) {
        info = Object.assign({}, rootReducer.players[appReducer.user_id])
    }
    return {
        id: appReducer.user_id,
        info,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initializePlayer: (id) => dispatch(player.actionInitializePlayer(id)),
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatcher.actionDispatch(id, data, { props, ws })),
        authenticateWs: (id, ws, session) => dispatch(wsDispatcher.actionAuthenticateWs(id, ws, session)),
        login: (id, data, ws) => dispatch(login.actionLogin(id, data, ws)),
        logout: (id, session) => dispatch(login.actionLogout(id, session)),
        register: (id, data) => dispatch(login.actionRegister(id, data)),
        selectCard: (id, card) => dispatch(round.actionSelectCard(id, card)),
        joinRoom: (id, session) => dispatch(room.actionJoinRoom(id, session)),
        leaveRoom: (id, session) => dispatch(room.actionLeaveRoom(id, session)),
        submitCard: (id, session, room, card) => dispatch(round.actionSubmitCard(id, session, room, card)),
        submitWinner: (id, session, room, card) => dispatch(round.actionSubmitWinner(id, session, room, card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);