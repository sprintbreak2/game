import React from 'react'
import { connect } from 'react-redux';
import { Container } from './styled';
import Button from './../Button/Button';
import logo from './../../../../assets/img/logo.png';
import { loginFailure } from './../../../modules/store/actions/actions';
import { useHistory } from 'react-router-dom';

const Header = ({ username, isLogged, loginOff }) => {

    const history = useHistory();

    const handleSignOutClick = () => {
        loginOff();
        history.push("/login");
    }

    return (
        <Container>
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg w-100">
                        <div className="container">
                            <a className={ username ? "navbar-brand-username" : "navbar-brand" } href="/">
                                <img src={logo} alt="Sprint Break" />
                            </a>

                            { isLogged && username ? (<div className="username">
                                <p>Usuario: {username}</p>
                            </div>) : null }

                            { isLogged ? (<div className="btn-salir">
                                <Button onClick={handleSignOutClick}>Abandonar</Button>
                            </div>) : null }

                        </div>
                    </nav>
                </div>
            </header>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        username: state.loginReducer.username,
        isLogged: state.loginReducer.isLogged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginOff: () => dispatch(loginFailure()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
