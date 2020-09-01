import React from 'react'
import Home from '../components/Home'
import renderer from 'react-test-renderer'
import { theme } from '@santander/everest-ui'
import { ThemeProvider } from 'styled-components'

it('renders correctly', () => {
    const tree = renderer
        .create(
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})
