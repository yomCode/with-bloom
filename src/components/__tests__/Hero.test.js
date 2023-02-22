import React from 'react';
import { render, screen} from '@testing-library/react';
import Hero from '../Hero/Hero.jsx';

test('renders hero subtitle', () => {
    render(<Hero />);
    const subtitle = screen.queryByText((content, element) => {
      return content.includes('Your One-Stop Solution for Tracking Real-Time');
    });
    expect(subtitle).toBeInTheDocument();
  });
  