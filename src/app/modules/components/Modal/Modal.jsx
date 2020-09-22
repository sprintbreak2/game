import React, { useState } from 'react'
import { 
    StyledModal, 
    StyledModalActions, 
    StyledModalContainer, 
    StyledModalContent,
    StyledModalOverlay  
} from './styled';
import { Button, TextField } from '@santander/everest-ui';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsername } from './../../../modules/store/actions/actions';


const Modal = ({ active, onCancel, newUsername }) => {

    const [value, setValue] = useState(null);
    const history = useHistory();

    const handleOnChange = value => {
        setValue(value);
    }

    const handleSuccess = () => {
        newUsername(value);
        history.push("/start");
    }

    return (active &&
        <StyledModalContainer>
            <StyledModalOverlay />
            <StyledModal>
                <StyledModalContent>
                    <h4>Por favor, ingresá tu nombre para jugar</h4>
                    <TextField name="username" label="Username" onChange={handleOnChange} />
                </StyledModalContent>
                <StyledModalActions>
                    <Button text="Cancelar" variant="secondary" size="medium" onClick={onCancel} />
                    <Button text="Confirmar" type="primary" size="medium" onClick={handleSuccess} />
                </StyledModalActions>
            </StyledModal>
        </StyledModalContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        newUsername: username => dispatch(setUsername(username)),
    }
}

export default connect(null, mapDispatchToProps)(Modal);
