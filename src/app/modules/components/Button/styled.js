import styled from 'styled-components';

export const StyledButton = styled.div`

    cursor: pointer;
    display: inline-flex;
    border: 1.5px solid #262533;
    border-radius: .5em;
    color: #262533;
    font-family: 'Barlow Semi Condensed';
    font-weight: 600;
    min-width: 128px;
    padding: .7em;
    box-sizing: border-box;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    transition: all .2s ease-in-out;

    &:hover {
        color: rgb(236,0,0);
        border-color: rgb(236,0,0);
    }

    &:active {
        transform: scale(0.9);
    }

`;