import { Button, Stack, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();


  return (
    <> 
      <Stack direction="column" spacing={2} padding={2}   sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <TextField
            id="outlined-password-input"
            label="User Name"
            type="text"
        />
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
        />
      </Stack>

      <Button variant="outlined" onClick={() => navigate('/dashboard/books')}>
        Login
      </Button>
    </>
  )
}

export default Login