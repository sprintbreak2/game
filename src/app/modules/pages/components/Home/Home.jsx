import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import { BtnHome, PageHome, ImgHome, PageContainer } from './styled';
import Button from './../../../components/Button/Button';
import { connect } from 'react-redux';
import Header from './../../../components/Header/Header';
import imgHome from './../../../../../assets/img/juego_crop.png';
import { logout } from './../../../store/actions/loginActions';
import { joinRoom, status } from './../../../store/actions/roomActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { wsDispatch } from './../../../store/actions/wsActions';
import { useHistory } from 'react-router-dom';
import Websocket from 'react-websocket';


const Home = props => {

    const { id, dispatchWs, session, initializePlayer, joinRoom, status, websocket } = props;

    const history = useHistory();

    useEffect(() => {
        initializePlayer(id);
    }, [])

    const handleJoinRoom = () => {
        joinRoom(id, session)
        .then(() => history.push("/room"))
        .catch(error => console.error(error));
    }

    const wsOpen = () => console.log('WS Open');

    const wsClose = data => console.log('WS Close', data);

    const wsData = data => {
        console.log('WS Recieved: ', data);
        dispatchWs(id, data, { props, ws: websocket });
    }

    const wsDataError = (data) => {
        console.error("WS Error", data)
    }

    return (
        <PageContainer>
            <Websocket url={config.api.ws_url}
                debug={false}
                reconnect={true}
                onOpen={wsOpen}
                onClose={wsClose}
                onMessage={wsData}
                onError={wsDataError}
                ref={websocket}
            />
            <Header />
            <PageHome>
                <ImgHome>
                    <img src={imgHome} alt="cartas-home" width="600" />
                </ImgHome>
                <BtnHome>
                    <Button className="main_btn" variant="outlined" onClick={handleJoinRoom}>Entrar al juego</Button>
                </BtnHome>
            </PageHome>
        </PageContainer>
    )
}

const mapStateToProps = state => {
    return {
        id: state.appReducer.user_id,
        session: state.appReducer.session,
        websocket: state.appReducer.websocket,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatch(id, data, { props, ws })),
        initializePlayer: (id) => dispatch(initializePlayer(id)),
        joinRoom: (id, session) => dispatch(joinRoom(id, session)),
        logout: (id, session) => dispatch(logout(id, session)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
