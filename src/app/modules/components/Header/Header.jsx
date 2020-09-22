import React from 'react'
import { connect } from 'react-redux';
import { Container } from './styled';
import { Button } from '@santander/everest-ui';
import logo from './../../../../assets/img/logo.png';

const Header = ({ username, isLogged }) => {

    React.useEffect(()=>{
        console.log(username);
    }, []);

    return (
        <Container>
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg w-100">
                        <div className="container">
                            <a className={ username ? "navbar-brand-username" : "navbar-brand" } href="/">
                                <img src={logo} alt="Sprint Break" />
                            </a>

                            { isLogged && username && <div className="username">
                                <p>usuario: {username}</p>
                            </div> }

                            { isLogged ? <div className="btn-salir">
                                <Button text="Abandonar" onClick={()=>{}} />
                            </div> : null }

                        </div>
                    </nav>
                </div>
            </header>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        username: state.appReducer.username,
        isLogged: state.appReducer.isLogged
    }
}

export default connect(mapStateToProps, null)(Header);
