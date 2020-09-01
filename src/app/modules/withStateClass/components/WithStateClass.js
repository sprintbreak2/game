import React, { Component } from 'react'
import propTypes from 'prop-types'

class WithStateClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amountOfClicks: 0,
            clicks: props.match.params.clicks
        }
        this.handleClick = () => {
            this.setState((state) => ({
                amountOfClicks: state.amountOfClicks + 1
            }))
        }
    }

    render() {
        const { amountOfClicks, clicks } = this.state

        return (
            <div>
                <div>
                    {' '}
                    {amountOfClicks >= clicks
                        ? 'You Win'
                        : 'You need to do ' + clicks + ' clicks to see magic'}
                </div>
                <div> You did {amountOfClicks} clicks</div>
                <button onClick={this.handleClick}>Click me!</button>
            </div>
        )
    }
}

WithStateClass.propTypes = {
    match: propTypes.object
}

export default WithStateClass
