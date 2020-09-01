import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    handleChange,
    callApi,
    HANDLE_CHANGE,
    SEND_INFO_OK,
    API_ERROR
} from '../Actions'
import * as service from '../../services/WithReduxStateServices'

jest.mock('../../services/WithReduxStateServices', () => ({
    saveEntity: jest.fn(() => Promise.resolve({ data: true }))
}))

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('asimple ctions', () => {
    beforeEach(() => service.saveEntity.mockReset())

    it('should create an action to handle a change', () => {
        const store = mockStore()
        service.saveEntity.mockResolvedValue({ data: true })

        const text = 'Handling Change'
        const expectedAction = {
            type: HANDLE_CHANGE,
            value: text
        }

        store.dispatch(handleChange(text))

        const [currentAction /* , ...rest */] = store.getActions()

        expect(store.getActions().length).toEqual(1)
        expect(currentAction).toEqual(expectedAction)
    })
})

describe('async actions', () => {
    it('fetch service success', () => {
        const expectedActions = [{ type: SEND_INFO_OK, value: true }]
        const store = mockStore({ todos: [] })

        return store.dispatch(callApi()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('fetch service rejected', () => {
        service.saveEntity.mockResolvedValue({ error: true })

        const expectedActions = [{ type: API_ERROR, value: true }]
        const store = mockStore({ todos: [] })

        return store.dispatch(callApi()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
