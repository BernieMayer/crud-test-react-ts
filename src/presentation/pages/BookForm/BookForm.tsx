import { useState } from "react";
import { Book } from "../../../models/Book";
import { Box, TextField, Button, Grid, Container } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const STORAGE_KEY = 'myBooks';

interface BookFormProps { 
  setBooks: (book: Book[]) => void; 
  books: Book[]; 
}


function BookForm(props:BookFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        publishedDate: ''
    });
    const [publishedDate, setPublishedDate] = useState<Dayjs | null>(dayjs('2022-04-17'));
    
    const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData.publishedDate);

    const newBook: Book = {
        title: formData.title,
        author: formData.author,
        // TODO add the other fields later
        id: "",
        isbn: formData.isbn,
        category: formData.category,
        publishedDate: publishedDate? publishedDate.toString(): "",
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container maxWidth="sm">
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
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

        <TextField
          label="ISBN"
          variant="outlined"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />

        <TextField
          label="Category"
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <DatePicker label="Published date" 
           value={publishedDate}
          onChange={(newValue) => setPublishedDate(newValue)}
        />

      </Grid>
      <Box sx={{padding: 2}}>
        <Button type="submit" variant="contained" color="primary">
            Submit
        </Button>
      </Box>
      </form>
      </Container>
    </LocalizationProvider>
    )
    
}

export default BookForm