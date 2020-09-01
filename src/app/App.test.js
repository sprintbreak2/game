import React from 'react'
// import { render } from '@testing-library/react';
import renderer from 'react-test-renderer'
import App from './App'

// for exhaustive testing:

/* test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})
