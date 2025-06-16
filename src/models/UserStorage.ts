import { User } from "./User";

const USER_KEY = "users";
const CURRENT_USER = "current_user";
class UserStorage {


     static storeUser(user:User) {
        const users = UserStorage.getAllUsers();
        const newUsers = users ? [...users, user] : [user];

        localStorage.setItem(USER_KEY, JSON.stringify(newUsers));
        localStorage.setItem(user.phone, JSON.stringify(user.phone));
        localStorage.setItem(user.emailAddress, JSON.stringify(user.emailAddress));
    }

    static getAllUsers(): User[] | null {
        const users = localStorage.getItem(USER_KEY);
        return users ? (JSON.parse(users) as User[]) : null;
    }

    static checkPhoneIsUnique(user: User): boolean {
        return localStorage.getItem(user.phone) === null;
    }

    static checkEmailIsUnique(user: User): boolean {
        return localStorage.getItem(user.emailAddress) === null;
    }
    
    static setCurrentUser(user:User) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    }

    static getCurrentUser():User | null {
        const current_user = localStorage.getItem(CURRENT_USER);
        return current_user? JSON.parse(current_user) as User : null;
    }
    
}

export default UserStorage;