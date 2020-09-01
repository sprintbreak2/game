import React, { useState } from 'react'
import './WithState.scss'

export const WithState = (props) => {
    const [disabled, changeState] = useState(false)

    return (
        <div>
            <button disabled={disabled}>
                {' '}
                click in the text and change my state!
            </button>
            <div className='customClass' onClick={() => changeState(!disabled)}>
                if you click me the button will be{' '}
                {disabled ? 'enabled' : 'disabled'}
            </div>
        </div>
    )
}

export default WithState
