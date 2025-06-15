import { useEffect, useState } from "react";
import { Book } from "../../../models/Book";
import {  TextField, Button, Grid, Container, Stack } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const STORAGE_KEY = 'myBooks';

interface BookFormProps { 
  setBooks: (book: Book[]) => void; 
  books: Book[]; 
  book?: Book | undefined | null;
}


function BookForm(props:BookFormProps) {
    const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
  });

  const [formType, setFormType] = useState("");

  const [publishedDate, setPublishedDate] = useState<Dayjs | null>(dayjs('2022-04-17'));

    useEffect(() => {
      if (props.book) {
        setFormData({
          title: props.book.title || "",
          author: props.book.author || "",
          isbn: props.book.isbn || "",
          category: props.book.category || "",
        });
        setFormType("edit");
        setPublishedDate(dayjs(props.book.publishedDate));
      } else {
        setFormType("create");
      }
    }, [props.book]);

    const clearBook = () => {
      if (formType === "edit") {
        setFormType("create");
      }
        setFormData({
          title: "",
          author: "",
          isbn: "",
          category: "",
        });
    }

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newBook: Book = {
        ...props.book, 
        id: props.book?.id || crypto.randomUUID(),
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        category: formData.category,
        publishedDate: publishedDate ? publishedDate.toString() : "",
        ownerId: props.book?.ownerId || "",
        createdAt: props.book?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

  const updatedBooks = props.book
      ? props.books.map((b) => (b.id === props.book?.id ? newBook : b)) // edit
      : [...props.books, newBook];

    saveBooks(updatedBooks);
  };

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
          defaultValue={props.book?.category}
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <DatePicker label="Published date" 
          defaultValue={dayjs(props.book?.publishedDate, "MM-DD-YYYY")}
           value={publishedDate}
          onChange={(newValue) => setPublishedDate(newValue)}
        />

      </Grid>
      <Stack direction="row" spacing={2} padding={2}   sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
        <Button type="submit" variant="contained" color="primary">
            {formType === "edit"? "Edit Book" : "Submit"}
        </Button>
        <Button type="button" onClick={()=> clearBook()} variant="contained" color="primary">
            Clear
        </Button>
      </Stack>
      </form>
      </Container>
    </LocalizationProvider>
    )
    
}

export default BookForm