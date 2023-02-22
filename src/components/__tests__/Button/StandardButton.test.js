import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StandardButton from '../../Button/StandardBotton';

describe('StandardButton', () => {
  test('renders button with correct text', () => {
    render(<StandardButton tag="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<StandardButton tag="Click me" onclick={handleClick} />);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
