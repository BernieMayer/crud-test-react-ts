import { useEffect, useState } from "react";
import UserStorage from "../../models/UserStorage"
import UsersTable from "../components/UserTable/UserTable"
import { User } from "../../models/User";
import {  Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState<User[] | null>(null);
  const navigate = useNavigate();
   useEffect(() => {
     const users = UserStorage.getAllUsers();
     if (users) {
       setUsers(users);
     }
   }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <Stack direction="row" spacing={2} justifyContent= "center">
        <Link  onClick={() => {navigate('/dashboard/books')}}>
          Books
        </Link>
        <Link onClick={() => {navigate('/dashboard/profile')}}>
          Profile
        </Link>
      </Stack>
        { users && <> 
              <h2> Users</h2><UsersTable users={users} /> </> }
    </>
  )
}

export default Dashboard