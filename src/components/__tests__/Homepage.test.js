import { render, screen } from '@testing-library/react';
import Homepage from '../../screens/Homepage/Homepage';

test('renders homepage components', () => {
  render(<Homepage />);
  const heroElement = screen.getByTestId('hero');
  const featuresElement = screen.getByTestId('features');
  expect(heroElement).toBeInTheDocument();
  expect(featuresElement).toBeInTheDocument();
});
