import React, { useState } from 'react'
import { 
    StyledModal, 
    StyledModalActions, 
    StyledModalContainer, 
    StyledModalContent,
    StyledModalOverlay  
} from './styled';
import Button from './../Button/Button';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsername, loginSuccess } from './../../../modules/store/actions/actions';


const Modal = ({ active, onCancel, newUsername, loginOn }) => {

    const [value, setValue] = useState(null);
    const history = useHistory();

    const handleOnChange = e => {
        setValue(e.target.value);
    }

    const handleSuccess = () => {
        newUsername(value);
        loginOn();
        history.push("/room");
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
                    <Button className="button" onClick={onCancel}>Cancelar</Button>
                    <Button className="button" onClick={handleSuccess}>Confirmar</Button>
                </StyledModalActions>
            </StyledModal>
        </StyledModalContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        newUsername: username => dispatch(setUsername(username)),
        loginOn: () => dispatch(loginSuccess()),
    }
}

export default connect(null, mapDispatchToProps)(Modal);
