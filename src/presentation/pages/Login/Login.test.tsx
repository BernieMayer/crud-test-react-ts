import { render, screen } from '@testing-library/react';
import Login from './Login'
import { MemoryRouter } from 'react-router-dom';

test('displays Login', () => {
  render( <MemoryRouter>
    <Login />
  </MemoryRouter>
  );
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});