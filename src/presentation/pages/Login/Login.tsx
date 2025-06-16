import { Button, Stack, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom";
import UserStorage from "../../../models/UserStorage";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const clickLogin = () => {
    const user = UserStorage.findUserUsingEmail(email);

    if (user) {
      UserStorage.setCurrentUser(user);
    }
    navigate('/dashboard/books')
  }

  return (
    <> 
      <Stack direction="column" spacing={2} padding={2}   sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
           <TextField
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
        />
      </Stack>

      <Button variant="outlined" onClick={clickLogin}>
        Login
      </Button>
    </>
  )
}

export default Login