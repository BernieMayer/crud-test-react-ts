import { Button, Stack, TextField } from "@mui/material"

function Login() {


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

      <Button variant="outlined">
        Login
      </Button>
    </>
  )
}

export default Login