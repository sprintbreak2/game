import React, { useRef } from 'react';
import Header from './../../../components/Header/Header';
import Card from './../../../components/Card/Card';
import { Container } from './styled';

const cards = [
    { color: 'roja', text: 'Mi contraseña de Online Banking es _______.', key: '00' },
    { color: 'blanca', text: 'Un termo.', key: '01' },
    { color: 'blanca', text: 'El password de root.', key: '02' },
    { color: 'blanca', text: 'Frutas los viernes.', key: '03' },
]

const Start = () => { 
    return (
        <React.Fragment>
            <Header />
            <Container>
                {cards.map(card => <Card key={card.key} color={card.color} text={card.text} />) }
            </Container>
        </React.Fragment>
    )
}

export default Start;
