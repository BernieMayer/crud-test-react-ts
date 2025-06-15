import { render, screen } from '@testing-library/react';
import BookForm from './BookForm'
import { Book } from '../../../models/Book';

test('displays Book Form', () => {
  render(<BookForm setBooks={function (book: Book[]): void { } } books={[]} />);
  expect(screen.getByText("Submit")).toBeInTheDocument();
});

test(`When a book is passed in the form is populated using the book`, async () => {
    let book: Book = {
        id: "123",
        title: "War and Peace",
        author: "John Smith",
        isbn: "123ab",
        category: "Non fiction",
        publishedDate: "12-25-1995",
        ownerId: "123",
        createdAt: '',
        updatedAt: ''
    }

    render(<BookForm setBooks={function (book: Book[]): void { } } books={[]} book={book}/>);

    expect(await screen.getByDisplayValue("War and Peace")).toBeInTheDocument();
    expect(await screen.getByDisplayValue("John Smith")).toBeInTheDocument();
    expect(await screen.getByDisplayValue("Non fiction")).toBeInTheDocument();
    expect(await screen.getByDisplayValue("123ab")).toBeInTheDocument();


    
    
});