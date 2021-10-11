import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const { container } = render(<App />);
  // const linkElement = screen.getByText(/url decoder/i);
  // expect(linkElement).toBeInTheDocument();
  const textAreas = container.querySelectorAll('textarea');
  expect(textAreas.length).toEqual(2);
});
