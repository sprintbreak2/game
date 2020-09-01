import React from 'react'
import './Home.scss'
import Button from '@santander/everest-ui/lib/Button'
import propTypes from 'prop-types'

export const Home = (props) => (
    <>
        <div className='customClass'>This is a dumb component</div>
        <div>
            The button below has the SantanderText-Regular font-family. You DONT
            need to put any fonts in the project. See index.js imports and find
            fonts.scss from everest. You can use all fonts provided by ux for
            free. Also, See the icons.scss import, to use all icons in our set.
            See more :
            https://everest-storybook-everest-ui-storybook.apps.ocppaz1.ar.bsch/?path=/story/components-icon--icon-set
        </div>
        <Button
            text='Hello!'
            options='centered'
            size='small'
            type='primary'
            disabled={false}
            onClick={() => props.history.push('/withState')}
            icon={{
                icon: 'icon-SYS001',
                position: 'right'
            }}
        />
    </>
)

Home.propTypes = {
    history: propTypes.object
}

export default Home
