// Used for automated testing of App.js using Jest (included in Create React App
// It’s not needed for your project unless you plan to write unit tests.


import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
