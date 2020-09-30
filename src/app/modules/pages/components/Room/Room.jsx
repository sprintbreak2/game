import React, { useState } from 'react';
import Button from './../../../components/Button/Button';
import Card from './../../../components/Card/Card';
import Header from './../../../components/Header/Header';
import Score from './../../../components/Score/Score';
import Timer from './../../../components/Timer/Timer';
import { RandomHelper } from './../../../../shared/helpers/RandomHelper';
import { ActionsWrapper, CardsWrapper, Container } from './styled';

const redCard = { 
    id: 0, 
    color: 'roja', 
    text: 'Mi contraseña de Online Banking es _______.'
};

const whiteCards = [
    { color: 'blanca', text: 'Un termo.', id: 1 },
    { color: 'blanca', text: 'El password de root.', id: 2 },
    { color: 'blanca', text: 'Frutas los viernes.', id: 3 },
]

const randomHelper = new RandomHelper();

const Room = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [houseCard, setHouseCard] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [timer, setTimer] = useState(true);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(false);

    const selectRandomCard = () => {
        return new Promise((resolve, reject) => {
            let card;

            const interval = setInterval(() => {
                card = whiteCards[randomHelper.getRandomInt(0, whiteCards.length)]
                setSelectedCard(card.id)
            }, 100)
            
            setTimeout(() => {
                clearInterval(interval)
                resolve(card.id)
            }, 500)
        })
    }

    const selectHouseCard = () => {
        return new Promise((resolve, reject) => {
            let card;

            const interval = setInterval(() => {
                card = whiteCards[randomHelper.getRandomInt(0, whiteCards.length)]
                setHouseCard(card.id)
            }, 100)
            
            setTimeout(() => {
                clearInterval(interval)
                resolve(card.id)
            }, 500)
        })
    }

    const handleSelectCard = async id => {
        setSelectedCard(id);
        setTimer(false);
        setPlaying(true);
        const randomHouseCard = await selectHouseCard();
        if(randomHouseCard === id) {
            setScore(score + 1);
            setWin(true);
        }

    }

    const handlePlayCard = async () => {
        setTimer(false);
        setPlaying(true);
        if(!selectedCard) {
            const randomCard = await selectRandomCard();
            const randomHouseCard = await selectHouseCard();
            if(randomCard === randomHouseCard) {
                setScore(score + 1);
                setWin(true);
            }
        }
    }

    return (
        <React.Fragment>
            <Header />
            <Container>
                <CardsWrapper>
                    {/* carta roja */}
                    { playing ? (
                        <div className="played-card">
                            <Card
                            key={redCard.id} 
                            id={redCard.id}
                            color={redCard.color}
                            text={redCard.text}
                            />
                            <p className="mensaje">Pregunta</p>
                        </div>) : (
                            <Card 
                            key={redCard.id} 
                            id={redCard.id}
                            color={redCard.color} 
                            text={redCard.text}
                            />)
                    }
                    {/* cartas blancas */}

                    { !playing && whiteCards.map(card => <Card
                            key={card.id} 
                            id={card.id}
                            color={card.color} 
                            text={card.text}
                            onClick={handleSelectCard}
                        />
                    ) }

                    { playing && selectedCard ? 
                    (<div className="playing-cards">
                        <div className="played-card">
                            <Card
                            key={whiteCards[selectedCard-1].id} 
                            id={whiteCards[selectedCard-1].id}
                            color={whiteCards[selectedCard-1].color} 
                            text={whiteCards[selectedCard-1].text}
                            />
                            <p className="mensaje">Vos elegiste</p>
                        </div>
                        <div className="played-card">
                            {houseCard ? (<Card 
                            key={whiteCards[houseCard-1].id} 
                            id={whiteCards[houseCard-1].id}
                            color={whiteCards[houseCard-1].color} 
                            text={whiteCards[houseCard-1].text}
                            selected={true}
                            win={win}
                            />) : <Card />}
                            <p className="mensaje">La casa elige</p>
                        </div>
                    </div>
                    ) : null }
                    
                </CardsWrapper>
                <ActionsWrapper>
                    { timer && <Timer onComplete={handlePlayCard} /> }
                    <Score score={score} />
                    {/* <Button onClick={handlePlayCard}>Jugar carta</Button> */}
                </ActionsWrapper>
            </Container>
        </React.Fragment>
    )
}

export default Room;
