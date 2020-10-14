import React, { useState } from 'react';
import config from '../../../../config/config';
import { connect } from 'react-redux';
import Card from './../../../components/Card/Card';
import Header from './../../../components/Header/Header';
import Score from './../../../components/Score/Score';
import Timer from './../../../components/Timer/Timer';
import Chat from './../../../components/Chat/Chat';
import { RandomHelper } from './../../../../shared/helpers/RandomHelper';
import { ActionsWrapper, CardsWrapper, Container, PageContainer } from './styled';
import { sendMessage } from './../../../store/actions/chatActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { wsDispatch } from './../../../store/actions/wsActions';
import { selectCard, submitCard, submitWinner } from './../../../store/actions/roundActions';
import Websocket from 'react-websocket';

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

const Room = props => {
    
    React.useEffect(() => {
        console.log(props);
    }, [])

    const chat = React.createRef();

    const [selectedCard, setSelectedCard] = useState(null);
    const [houseCard, setHouseCard] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [timer, setTimer] = useState(true);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(false);

    /** TypePlayer = { 0: CASA, 1: JUGADOR } */
    const [typePlayer, setTypePlayer] = useState(0);

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

    const handleMessageClick = message => {
        props.sendMessage(props.id, props.session, message);
    }

    const wsOpen = () => console.log('WS Open');

    const wsClose = data => console.log('WS Close', data);

    const wsData = data => {
        console.log('WS Recieved: ', data);
        props.dispatchWs(props.id, data, { props, ws: props.websocket });
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
                ref={props.websocket}
            />
            <Header />
            <Container>
                <div class="play-container">                
                    <CardsWrapper>

                        {/* carta roja */}
                        { playing ? (
                            <div className="played-card">
                                <Card
                                // key={redCard.id}
                                // id={redCard.id}
                                // color={redCard.color}
                                color="roja"
                                text={props.redCard.content}
                                />
                                <p className="mensaje">Pregunta</p>
                            </div>) : (
                                <Card
                                // key={redCard.id}
                                // id={redCard.id}
                                // color={redCard.color}
                                color="roja"
                                text={props.redCard.content}
                                />
                            )
                        }
                        {/* cartas blancas */}

                        { !playing && typePlayer === 0 && (
                            <>
                            <Card />
                            <Card />
                            <Card />
                            </>
                        ) }

                        { !playing && typePlayer !== 0 && props.whiteCards.map(card => <Card
                                // key={card.id} 
                                // id={card.id}
                                // color={card.color} 
                                color="blanca" 
                                text={card.content}
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
                </div>
                <Chat sendMessage={handleMessageClick} username={props.id} messages={props.messages} ref={chat} />
            </Container>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        accumulatedPoints: state.appReducer.accumulatedPoints,
        chooseCardLimit: state.appReducer.chooseCardLimit,
        chooseWinnerLimit: state.appReducer.chooseWinnerLimit,
        dateLimit: state.appReducer.dateLimit,
        error: state.appReducer.error,
        id: state.appReducer.id,
        messages: state.appReducer.messages,
        nickname: state.appReducer.nickname,
        playerType: state.appReducer.playerType,
        points: state.appReducer.points,
        redCard: state.appReducer.redCard,
        room: state.appReducer.room,
        roundLimit: state.appReducer.roundLimit,
        selectedCard: state.appReducer.selectCard,
        session: state.appReducer.session,
        submitted: state.appReducer.submitted,
        superpoints: state.appReducer.superpoints,
        websocket: state.appReducer.websocket,
        whiteCards: state.appReducer.whiteCards,
        winner: state.appReducer.winner,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatch(id, data, { props, ws })),
        initializePlayer: (id) => dispatch(initializePlayer(id)),
        selectCard: (id, card) => dispatch(selectCard(id, card)),
        sendMessage: (id, session, message) => dispatch(sendMessage(id, session, message)),
        submitCard: (id, session, room, card) => dispatch(submitCard(id, session, room, card)),
        submitWinner: (id, session, room, card) => dispatch(submitWinner(id, session, room, card))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
