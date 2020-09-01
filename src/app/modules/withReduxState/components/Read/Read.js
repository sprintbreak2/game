import React from 'react'
import propTypes from 'prop-types'

export const Read = (props) => <div>{props.valueToShowInReadComponent}</div>

Read.propTypes = {
    valueToShowInReadComponent: propTypes.string
}

export default Read
