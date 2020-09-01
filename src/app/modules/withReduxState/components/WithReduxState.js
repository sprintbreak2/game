import React from 'react'
import './WithReduxState.scss'
import propTypes from 'prop-types'
import Write from './Write/Write'
import Read from './Read/Read'

export const WithReduxState = (props) => (
    <div>
        <Write value={props.value} handleChange={props.handleChange} />
        <Read valueToShowInReadComponent={props.valueToShowInReadComponent} />
        <div>Modify the input and see the changes through Redux </div>
        <button onClick={() => props.callApi()}>
            This button call an endpoint and turn on the spinner
        </button>
    </div>
)

WithReduxState.propTypes = {
    value: propTypes.string,
    valueToShowInReadComponent: propTypes.string,
    callApi: propTypes.func,
    handleChange: propTypes.func
}

WithReduxState.defaultProps = {
    value: 'DefaultValueInPropTypes'
}

export default WithReduxState
