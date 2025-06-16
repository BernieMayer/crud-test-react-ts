import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';


test('it has the right components', async() => {

    render(<UserForm mode='new' />);

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();

})