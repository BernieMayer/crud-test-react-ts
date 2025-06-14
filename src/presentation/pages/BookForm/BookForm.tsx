import { useState } from "react";
import { Book } from "../../../models/Book";
import { Box, TextField, Button } from "@mui/material";

const STORAGE_KEY = 'myBooks';

interface BookFormProps { 
  setBooks: (book: Book[]) => void; 
  books: Book[]; 
}

function BookForm(props:BookFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
    });
    
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      }));
  };

const saveBooks = (newBooks: Book[]) => {
    props.setBooks(newBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBooks));
  };


  const addBook = (newBook: Book) => {
    const updatedBooks = [...props.books, newBook];
    saveBooks(updatedBooks);
  };
    
    return (

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
    )
    
}

export default BookForm