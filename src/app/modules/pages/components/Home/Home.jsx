import React, { useEffect, useState } from 'react'
import { BtnHome, PageHome, ImgHome, PageContainer } from './styled';
import Button from './../../../components/Button/Button';
import { connect } from 'react-redux';
import Header from './../../../components/Header/Header';
// import Modal from './../../../components/Modal/Modal';
import imgHome from './../../../../../assets/img/juego_crop.png';
import { logout } from './../../../store/actions/loginActions';
import { joinRoom, status } from './../../../store/actions/roomActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { useHistory } from 'react-router-dom';

const Home = ({ id, session, initializePlayer, joinRoom, status, rooms, playingPlayers, waitingPlayers }) => {

    const history = useHistory();

    useEffect(() => {
        initializePlayer(id);
        status();
    }, [])

    const handleJoinRoom = () => {
        joinRoom(id, session)
        .then(() => history.push("/room"))
        .catch(error => console.error(error));
    }

    // const [modal, setModal] = useState(false);

    return (
        <PageContainer>
            <Header />
            {/* <Modal active={modal} onCancel={() => setModal(false)} /> */}
            <PageHome>
                <ImgHome>
                    <img src={imgHome} alt="cartas-home" width="600" />
                </ImgHome>
                <BtnHome>
                    {/* <Button className="main_btn" variant="outlined" onClick={()=>setModal(true)}>Entrar al juego</Button> */}
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
        rooms: state.appReducer.rooms,
        playingPlayers: state.appReducer.playingPlayers,
        waitingPlayers: state.appReducer.waitingPlayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initializePlayer: (id) => dispatch(initializePlayer(id)),
        joinRoom: (id, session) => dispatch(joinRoom(id, session)),
        logout: (id, session) => dispatch(logout(id, session)),
        status: () => dispatch(status())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
