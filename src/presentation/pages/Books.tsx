import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Book } from '../../models/Book';
import { Container, Box } from "@mui/material";


const STORAGE_KEY = 'myBooks';

function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
    });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBook: Book = {
        title: formData.title,
        author: formData.author,
        // TODO add the other fields later
        id: "",
        isbn: "",
        category: "",
        publishedDate: "",
        ownerId: "",
        createdAt: "",
        updatedAt: ""
    };
    
    addBook(newBook);
    
  }

const saveBooks = (newBooks: Book[]) => {
    setBooks(newBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks));
  };

  // Example: Add a new book
  const addBook = (newBook: Book) => {
    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
 <Container maxWidth="sm">
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
    <h1>Books</h1>

    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Author"
          variant="outlined"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </form>

    <Box sx={{ mt: 4 }}>
      {books.length === 0 ? (
        <p>No books saved yet.</p>
      ) : (
        <ul>
          {books.map((book, idx) => (
            <li key={idx}>
              <strong>{book.title}</strong> by {book.author}
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