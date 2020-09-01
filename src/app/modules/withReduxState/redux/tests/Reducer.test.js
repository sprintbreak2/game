import withReduxState from '../Reducer'

import { HANDLE_CHANGE } from '../Actions'

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(withReduxState(undefined, {})).toEqual({
            valueToShowInReadComponent: undefined
        })
    })

    it('should handle HANDLE_CHANGE', () => {
        expect(
            withReduxState([], {
                type: HANDLE_CHANGE,
                value: true
            })
        ).toEqual({
            valueToShowInReadComponent: true
        })
    })
})
