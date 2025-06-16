import { useEffect, useState } from "react";
import UserStorage from "../../models/UserStorage"
import UsersTable from "../components/UserTable/UserTable.test"
import { User } from "../../models/User";

function Dashboard() {
  const [users, setUsers] = useState<User[] | null>(null);
   useEffect(() => {
     const users = UserStorage.getAllUsers();
     if (users) {
       setUsers(users);
     }
   }, []);

  return (
    <>
      <h1>Dashboard</h1>
        { users && <> 
              <h2> Users</h2><UsersTable users={users} /> </> }
    </>
  )
}

export default Dashboard