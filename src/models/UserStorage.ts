import { User } from "./User";

const USER_KEY = "users";
class UserStorage {


     static storeUser(user:User) {
        const users = UserStorage.getAllUsers()
        const newUsers = users ? [...users, user] : [user];

        localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
    }

    static getAllUsers(): User[] | null {
        const users = localStorage.getItem(USER_KEY);
        return users ? (JSON.parse(users) as User[]) : null;
    }
}

export default UserStorage;