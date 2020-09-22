import styled from 'styled-components';

export const CardContainer = styled.div`
    border: 0.5px solid #D1D1D1;
    border-radius: 15px;    
    min-width: 265px;
    max-width: 265px;
    min-height: 400px;
    max-height: 400px;
    margin: 1rem;
    transition: all 0.2s ease;
    
    &.blanca, &.blanca-checked {
        background: rgb(255,255,255);
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 35%, rgba(238,238,238,1) 100%);
        color: black;

        &:hover {
            border: 0.5px solid rgb(236,0,0);
            cursor: pointer;
        }
    }

    &.blanca-checked {
        border: 0.5px solid rgb(236,0,0);
        transform: translate(0, -25px);
        -moz-transform: translate(0, -25px);
        -ms-transform: translate(0, -25px);
        -o-transform: translate(0, -25px);
        -webkit-transform: translate(0, -25px);
    }

    &.roja, &.roja-checked {
        background: rgb(236,0,0);
        background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
        color: #ffffff;
    }
`;

export const CardWrapper = styled.div`
    min-width: 265px;
    max-width: 265px;
    min-height: 400px;
    max-height: 400px;  
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

export const CardContent = styled.div`
    p {
        text-align: left;
        font-weight: 400;
        font-size: 24px;
    }
`;

export const CardFooter = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;