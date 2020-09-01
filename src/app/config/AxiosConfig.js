import Axios from 'axios'
// import { LocalStorageHelper } from '../shared/helpers/LocalStorageHelper';
import { store } from '../Store'

// for auth for example
// const localStorageHelper = new LocalStorageHelper();
const { dispatch } = store
Axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

Axios.interceptors.request.use((request) => requestHandler(request))

Axios.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
)

const requestHandler = (request) => {
    dispatch({ type: 'LOADING_ON' })
    // request.headers['Authorization'] = OwnAuth;
    // request.headers['Content-Type'] =  Own content. Ex: 'application/json';
    return request
}

// Interceptor de response ERROR.
const errorHandler = (error) => {
    dispatch({ type: 'LOADING_OFF' })
    let errorMessage = 'Error de conexion'

    if (error.response) {
        switch (error.response.status.toString()) {
            case '400': {
                // BAD REQUEST
                break
            }

            case '401': {
                // Unauthorized
                break
            }

            case '403': {
                // Forbbiden
                break
            }

            case '404': {
                // NOT FOUND
                break
            }

            case '500': {
                // INTERNAL SERVER ERROR
                break
            }

            default: {
                errorMessage = 'Se produjo un error'
            }
        }
    }

    return {
        // After all, return the object
        error: {
            code: error.response.status.toString(),
            errorMessage: errorMessage
        },
        data: undefined
    }
}

// Interceptor de response OK.
const successHandler = (response) => {
    dispatch({ type: 'LOADING_OFF' })

    return {
        // Response
        data: response.data,
        error: undefined
    }
}
