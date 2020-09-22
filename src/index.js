import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from 'app/App'
import * as serviceWorker from 'serviceWorker'
import { persistor, store } from 'app/Store'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, withRouter } from 'react-router-dom'
import ApplicationRoutes from 'app/Routes'
import AppRoute from 'app/AppRoute'
import { PersistGate } from 'redux-persist/lib/integration/react'

import theme from '@santander/everest-ui/lib/theme'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import '@santander/everest-ui/src/fonts.css'
import '@santander/everest-ui/src/icons.css'

import 'assets/stylesheets/main.scss'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Spinner from 'app/shared/components/loader/SpinnerContainer'

// Own toast
// import { ToastContainer} from 'react-toastify';

import 'app/config/AxiosConfig'

const { Routes } = ApplicationRoutes

const BodyComponent = ({ location: { pathname } }) => (
    <Switch>
        {Routes.map((route) => (
            <AppRoute key={route.key} {...route} />
        ))}
    </Switch>
)

BodyComponent.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
}

const Body = withRouter(BodyComponent)

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'SantanderMicroText';
        font-size: 16px;
    }

    body {
        height: 100%;
        margin: 0;
        padding: 0;
        transition: all 0.3s ease;
    }

    textarea:focus, button:focus, input:focus, img:focus {
        outline: none;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        <Spinner />
                        <App>
                            <Body key='body' />
                        </App>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
