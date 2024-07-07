import React from 'react';
import { render, screen } from '@testing-library/react';
import OtpForm from './OtpForm';

test('renders learn react link', () => {
  render(<OtpForm inputsAmount={1} handleSubmit={function (values: string): void {
    throw new Error('Function not implemented.');
  } } />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
