import { render, screen } from '@testing-library/react';
import Login from './Login'

test('displays Login', () => {
  render(<Login />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});