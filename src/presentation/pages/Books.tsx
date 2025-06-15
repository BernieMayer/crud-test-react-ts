import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Book } from '../../models/Book';
import { Container, Box } from "@mui/material";
import BookForm from "./BookForm/BookForm";


const STORAGE_KEY = 'myBooks';

function Books() {
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  function editBookProc(book:Book) {
    console.log(book);
    setEditBook(book);
  }

  return (
 <Container maxWidth="sm">
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
    <h1>Books</h1>

    
    <BookForm setBooks={setBooks} books={books} book={editBook}/>

    

    <Box sx={{ mt: 4 }}>
      {books.length === 0 ? (
        <p>No books saved yet.</p>
      ) : (
        <ul>
          {books.map((book, idx) => (
            <li key={idx}>
              <strong>{book.title}</strong> by {book.author} 
            <Button type="button" onClick={() => {editBookProc(book)}} variant="contained" color="primary">
            Edit
            </Button>
            </li>
          ))}
        </ul>
      )}
    </Box>
  </Box>
</Container>
  )
}

export default Books