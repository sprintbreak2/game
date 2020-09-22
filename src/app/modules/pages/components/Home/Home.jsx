import React, { useState } from 'react'
import { BtnHome, PageHome, ImgHome } from './styled';
import { Button } from '@santander/everest-ui';
import { connect } from 'react-redux';
import Header from './../../../components/Header/Header';
import Modal from './../../../components/Modal/Modal';
import imgHome from './../../../../../assets/img/juego_crop.png';

const Home = ({ user }) => {

    const [modal, setModal] = useState(false);

    return (
        <React.Fragment>
            <Header user={user} />
            <Modal active={modal} onCancel={() => setModal(false)} />
            <PageHome>
                <ImgHome>
                    <img src={imgHome} alt="cartas-home" width="600" />
                </ImgHome>
                <BtnHome>
                    <Button text="Entrar al juego" size="large" variant="primary" onClick={()=>setModal(true)} />
                </BtnHome>
            </PageHome>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.appReducer.userData,
    }
}

export default connect(mapStateToProps, null)(Home);
