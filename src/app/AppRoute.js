import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NotLogged from './modules/pages/components/Login/NotLogged';

const AppRoute = (routeProps) => {
    const { component: Component, path, exact, extraPropsHeader, logged, routeProtected } = routeProps;
    let page = (<Route {...{exact, path}} render={props => <Component {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    let notLoggedPage = (<Route {...{exact, path}} render={props => <NotLogged {...props} extraPropsHeader={(event) => extraPropsHeader(event)} />} />);
    // Here goes the authentication
    if(routeProtected) {
        if(logged) {
            return page;
        } else {
            return notLoggedPage;
        }
    } else {
        return page;
    }
}

const mapStateToProps = state => {
    return {
        logged: state.appReducer.logged
    }
}

export default connect(mapStateToProps, null)(AppRoute);