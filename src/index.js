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
import { ThemeProvider } from 'styled-components'

import '@santander/everest-ui/src/fonts.css'
import '@santander/everest-ui/src/icons.css'

import 'assets/stylesheets/main.scss'

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

const estiloColor = {
    height: '100%',
    margin: '0 auto'
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <div style={estiloColor}>
                        <Spinner />
                        <App>
                            <Body key='body' />
                        </App>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
