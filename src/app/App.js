import React from 'react'
import propTypes from 'prop-types'

const App = ({ children }) => <>{children}</>

App.propTypes = {
    children: propTypes.element
}

export default App
