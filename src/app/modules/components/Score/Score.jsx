import React from 'react'
import { StyledScore } from './styled';

const Score = ({ score = 0 }) => {
    return (
        <StyledScore>
            <p className="score-label">Score:</p>
            <p className="score-value">{score}</p>
        </StyledScore>
    )
}

export default Score;
