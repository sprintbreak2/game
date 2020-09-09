import React, { useState } from 'react'
import Header from './../../../components/Header/Header';
import Modal from './../../../components/Modal/Modal';
import { BtnHome, PageHome, ImgHome } from './styled';
import imgHome from './../../../../../assets/img/juego_crop.png';
import { Button } from '@santander/everest-ui';

const Home = () => {

    const [modal, setModal] = useState(false);

    return (
        <React.Fragment>
            <Header />
            <Modal active={modal}
                onCancel={() => setModal(false)}
                onSuccess={()=> setModal(false)} />
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

export default Home
