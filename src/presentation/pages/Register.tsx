import { Stack } from "@mui/material"
import UserForm from "../components/UserForm/UserForm"

function Register() {


  return (
    <>
      
  <Stack direction="column" spacing={2} padding={2}   sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
    
    <h1>Register</h1>
    <UserForm/>
  </Stack>
    </>
  )
}

export default Register