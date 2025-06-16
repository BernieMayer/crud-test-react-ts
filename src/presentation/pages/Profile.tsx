import { useEffect, useState } from "react";
import { User } from "../../models/User";
import UserForm from "../components/UserForm/UserForm"
import UserStorage from "../../models/UserStorage";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [currentUser, setCurrentUser] = useState<User| null>(null);
  const [currentMode, setCurrentMode] = useState<String>("profile")
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = UserStorage.getCurrentUser();
    setCurrentUser(currentUser);
  }, []);

  const editProfile = () => {
    setCurrentMode("edit");
  }

  return (
    <>
      <h1>Profile</h1>
        <Link  onClick={() => {navigate('/dashboard')}}>
          Dashboard
        </Link>

      { currentUser && <UserForm mode={currentMode === "profile" ? "profile" : "edit"} user={currentUser}  onValidSubmit={() => {setCurrentMode("profile")}}/> }


        <Button 
          type="button" 
          onClick={() => editProfile()} 
          variant="contained" 
          color="primary"
          disabled={currentMode!=="profile"}
        >
          Edit
        </Button>
        
    </>
  )
}

export default Profile