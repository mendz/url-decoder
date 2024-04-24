import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  // const linkElement = screen.getByText(/url decoder/i);
  // expect(linkElement).toBeInTheDocument();
  const textAreas = screen.getAllByRole('textbox');
  expect(textAreas.length).equal(2);
});
