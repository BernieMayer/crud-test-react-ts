import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerValue } from "@mui/x-date-pickers/internals/models";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { User } from "../../../models/User";import UserStorage from "../../../models/UserStorage";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useNavigate } from "react-router-dom";


export default function UserForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth:  dayjs(),
      });

    const navigate = useNavigate();

    const [isValidForm, setValidForm] = useState(false);
    const [errorText, setErrorText] = useState("");
    
    const setError = (errorText:string) => {
        setValidForm(false);
        setErrorText(errorText);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!parsePhoneNumberFromString(formData.phone)) {
            setError("Invalid phone number");

            return;
        }

      
        const newUser: User = {
            id: crypto.randomUUID(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.email,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth.toString(),
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        if (!UserStorage.checkEmailIsUnique(newUser)) {
            setError("Email must be unique");
            return;
        }

        if (!UserStorage.checkPhoneIsUnique(newUser)) {
            setError("Phone must be unique");
            return;
        }

        setValidForm(true);
        UserStorage.storeUser(newUser);

        navigate('/dashboard/books')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorText("");
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                />

                <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                />
                </Stack>

                <Stack direction="row" spacing={2} padding={2}>
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
                </Stack>
                <Box padding={2}>
                      <DatePicker
                        label="Date of Birth" 
                        value={formData.dateOfBirth}
                        onChange={(newValue) => handleDateChange(newValue)}
                        />
                </Box>

                <Box>
                    <Button type="submit" variant="contained" color="primary">
                        { "Register"}
                    </Button>
                </Box>       
            </form>

             {!isValidForm && <p> {errorText} </p>}
        </Container>
        </LocalizationProvider>
    );
}