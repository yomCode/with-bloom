import React from 'react';
import { render } from '@testing-library/react';
import Features from '../../Features/Features';

describe('Features', () => {
  test('renders feature cards', () => {
    const { getByLabelText } = render(<Features />);
    const featureRegion = getByLabelText('Features');
    const featureCards = featureRegion.querySelectorAll('.feature-card');

    expect(featureCards.length).toBe(0);
  });
});
