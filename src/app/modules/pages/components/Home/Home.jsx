import React, { useState } from 'react'
import { BtnHome, PageHome, ImgHome } from './styled';
// import { Button } from '@material-ui/core';
import Button from './../../../components/Button/Button';
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
                    <Button className="main_btn" variant="outlined" onClick={()=>setModal(true)}>Entrar al juego</Button>
                </BtnHome>
            </PageHome>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.loginReducer.userData,
    }
}

export default connect(mapStateToProps, null)(Home);
