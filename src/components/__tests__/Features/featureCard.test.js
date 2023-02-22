import React from 'react';
import { render } from '@testing-library/react';
import FeatureCard from '../../Features/FeatureCard';

describe('FeatureCard', () => {
  it('renders the heading and text', () => {
    const { getByText } = render(<FeatureCard heading="heading" text="text" />);
    expect(getByText('heading')).toBeInTheDocument();
    expect(getByText('text')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    const { getByTestId } = render(<FeatureCard icon="icon" />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });
});