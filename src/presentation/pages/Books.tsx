import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Book } from '../../models/Book';
import { Container, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

  const deleteBook = (book:Book) => {
    const newBooks = books.filter((b) => (b.id !== book.id));
    setBooks(newBooks);
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Author</strong></TableCell>
            <TableCell><strong>ISBN</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Published Date</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, idx) => (
            <TableRow key={idx}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.publishedDate}</TableCell>
              <TableCell>
                <Box sx={{padding: 1}}>
                  <Button 
                    type="button" 
                    onClick={() => setEditBook(book)} 
                    variant="contained" 
                    color="primary"
                  >
                    Edit
                  </Button>
                </Box>
                <Box sx={{padding: 1}}>
                  <Button
                    type="button"
                    onClick={() => deleteBook(book) }
                    variant="contained"
                    color="error">
                      Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
  </Box>
  </Box>
</Container>
  )
}

export default Books