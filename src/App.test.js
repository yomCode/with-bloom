import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders the homepage', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const homepageTitle = screen.getByText(/Welcome to our app/i);
  expect(homepageTitle).toBeInTheDocument();
});
