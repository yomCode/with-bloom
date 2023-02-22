import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../Button/Button';

describe('Button', () => {
  it('renders a button with the given text', () => {
    const buttonText = 'Click me';
    render(<Button tag={buttonText} />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeInTheDocument();
  });

  it('calls a function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button tag="Click me" onclick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
