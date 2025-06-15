import { render, screen } from '@testing-library/react';
import BookForm from './BookForm'
import { Book } from '../../../models/Book';

test('displays Book Form', () => {
  render(<BookForm setBooks={function (book: Book[]): void { } } books={[]} />);
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});

test(`When a book is passed in the form is populated using the book`, () => {
    let book: Book = {
        id: "123",
        title: "War and Peace",
        author: "John Smith",
        isbn: "123ab",
        category: "Non fiction",
        publishedDate: "December 22nd, 1992",
        ownerId: "123",
        createdAt: '',
        updatedAt: ''
    }

    render(<BookForm setBooks={function (book: Book[]): void { } } books={[]} book={book}/>);
    expect(screen.getByText(/War and Peace/i)).toBeInTheDocument();
    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Non Fiction/i)).toBeInTheDocument();


    
    
});