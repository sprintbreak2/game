import React from 'react'
import { Container } from './styled';
import logo from './../../../../assets/img/logo.png';

const Header = () => {
    return (
        <Container>
            <header className="header_area">
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg w-100">
                        <div className="container">
                            <a className="navbar-brand" href="#">
                                <img src={logo} alt="Sprint Break" />
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </Container>
    )
}

export default Header
