import { Grid, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerValue } from "@mui/x-date-pickers/internals/models";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";


export default function UserForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth:  dayjs(),
      });
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      }));
  };

  const handleDateChange = (newValue: PickerValue) => {
    setFormData((prev) => ({
        ...prev,
        dateOfBirth: dayjs(newValue)
    }));
  }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} padding={2}>
                <TextField
                label="First Name"
                variant="outlined"
                name="first_name"
                value={formData.firstName}
                onChange={handleChange}
                required
                />

                <TextField
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={formData.lastName}
                onChange={handleChange}
                required
                />
                </Stack>

                <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />

                <TextField
                label="Phone"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                />

                <DatePicker
                label="Date of Birth" 
                value={formData.dateOfBirth}
                onChange={(newValue) => handleDateChange(newValue)}
                />

           
            </form>
        </Container>
        </LocalizationProvider>
    );
}