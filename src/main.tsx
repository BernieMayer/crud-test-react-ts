import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import {  Routes, Route } from "react-router-dom";
import Dashboard from './presentation/pages/Dashboard';
import Profile from './presentation/pages/Profile.tsx';
import Books from './presentation/pages/Books.tsx';
import Login from './presentation/pages/Login/Login.tsx';
import Register from './presentation/pages/Register.tsx';
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
       <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} ></Route>
        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="books" element={<Books />} />
        </Route>
        <Route path="/" element={  <App /> }  />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
