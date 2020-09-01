import React from 'react'
import propTypes from 'prop-types'

export const Write = (props) => (
    <input
        type='text'
        value={props.value}
        onChange={(event) => props.handleChange(event.target.value)}
    />
)

Write.propTypes = {
    value: propTypes.string,
    handleChange: propTypes.func
}

Write.defaultProps = {
    value: 'DefaultValueInPropTypes'
}

export default Write
