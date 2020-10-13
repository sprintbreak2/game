import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from './../../../components/Card/Card';
import Header from './../../../components/Header/Header';
import Score from './../../../components/Score/Score';
import Timer from './../../../components/Timer/Timer';
import { RandomHelper } from './../../../../shared/helpers/RandomHelper';
import { ActionsWrapper, CardsWrapper, Container, PageContainer } from './styled';
import { player, room, round, wsDispatcher } from './../../../store/actions/index';

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

    const { 
        initializePlayer,
        dispatchWs, 
        selectCard,
        joinRoom,
        leaveRoom,
        submitCard,
        submitWinner,
        room
    } = props;

    const [info, setInfo] = useState({
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
    });

    React.useEffect(() => {
        console.log(room);
    }, [])

    const [session, setSession] = useState({
        origin: "",
        origin_id: "",
        token: "",
        username: ""
    })

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

    return (
        <PageContainer>
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

                    { !playing && typePlayer === 0 && (
                        <>
                        <Card />
                        <Card />
                        <Card />
                        </>
                    ) }

                    { !playing && typePlayer !== 0 && whiteCards.map(card => <Card
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
        </PageContainer>
    )
}

const mapStateToProps = (state, self) => {
    // console.log("This id:" + self.id)
    // console.log("Props:",state.players[self.id])
    // const props = {}
    // if (state.players[self.id]) {
    //     props.info = Object.assign({}, state.players[self.id])
    // }
    // return props
    return {
        room: state.appReducer.room,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateWs: (id, ws, session) => dispatch(wsDispatcher.actionAuthenticateWs(id, ws, session)),
        initializePlayer: (id) => dispatch(player.actionInitializePlayer(id)),
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatcher.actionDispatch(id, data, { props, ws })),
        selectCard: (id, card) => dispatch(round.actionSelectCard(id, card)),
        joinRoom: (id, session) => dispatch(room.actionJoinRoom(id, session)),
        leaveRoom: (id, session) => dispatch(room.actionLeaveRoom(id, session)),
        submitCard: (id, session, room, card) => dispatch(round.actionSubmitCard(id, session, room, card)),
        submitWinner: (id, session, room, card) => dispatch(round.actionSubmitWinner(id, session, room, card))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
