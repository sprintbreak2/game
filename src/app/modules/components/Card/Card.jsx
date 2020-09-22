import React, { useState, useRef } from 'react'
import { CardContainer, CardWrapper, CardContent, CardFooter } from './styled';
import elsa from './../../../../assets/img/elsa.svg';
import elsaWhite from './../../../../assets/img/elsa-white.svg';
import { useOutsideClick } from './../../../shared/helpers/useOutsideClick';


const Card = ({ color, text }) => {
    const [checked, setChecked] = useState(false);
    
    const handleClick = () => checked ? setChecked(false) : setChecked(true);
    
    const ref = useRef();
    useOutsideClick(ref, () => setChecked(false))

    return (
        <CardContainer ref={ref} onClick={handleClick} className={`${ checked ? color+"-checked" : color }`}>
            <CardWrapper>
                <CardContent>
                    <p>{text}</p>
                </CardContent>
                <CardFooter>
                    { <img src={ color === "roja" ? elsaWhite : elsa } alt="elsa" width={75} /> }
                </CardFooter>
            </CardWrapper>
        </CardContainer>
    )
}

export default Card;