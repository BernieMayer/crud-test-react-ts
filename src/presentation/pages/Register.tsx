import { Stack } from "@mui/material"
import UserForm from "../components/UserForm/UserForm"
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import UserStorage from "../../models/UserStorage";

function Register() {
  const navigate = useNavigate();



  function registerUserCallback(user:User):void  {
    navigate('/dashboard/books');
    UserStorage.setCurrentUser(user);
  }

  return (
    <>
      
  <Stack direction="column" spacing={2} padding={2}   sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>
    
    <h1>Register</h1>
    <UserForm onValidSubmit={registerUserCallback}/>
  </Stack>
    </>
  )
}

export default Register