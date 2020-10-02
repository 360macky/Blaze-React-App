import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders blaze slogan', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Blaze Customer Data/i);
  expect(linkElement).toBeInTheDocument();
});
