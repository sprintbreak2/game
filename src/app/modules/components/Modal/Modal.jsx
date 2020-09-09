import React from 'react'
import { 
    StyledModal, 
    StyledModalActions, 
    StyledModalContainer, 
    StyledModalContent,
    StyledModalOverlay  
} from './styled';
import { Button, TextField } from '@santander/everest-ui';

const Modal = ({ active, onCancel, onSuccess }) => {
    return (active &&
        <StyledModalContainer>
            <StyledModalOverlay />
            <StyledModal>
                <StyledModalContent>
                    <h4>Por favor, elegí tu nombre de usuario</h4>
                    <TextField label="Username" />
                </StyledModalContent>
                <StyledModalActions>
                    <Button text="Cancelar" variant="secondary" size="medium" onClick={onCancel} />
                    <Button text="Confirmar" type="primary" size="medium" onClick={onSuccess} />
                </StyledModalActions>
            </StyledModal>
        </StyledModalContainer>
    )
}

export default Modal;
