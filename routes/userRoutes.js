import signup from '../handlers/user/signup.js';
import login from '../handlers/user/login.js';
import getUser from '../handlers/user/getUser.js';
import getAllUsers from '../handlers/user/getAllUsers.js';
import editUser from '../handlers/user/editUser.js';
import deleteUser from '../handlers/user/deleteUser.js';

export default function userRoutes(app) {
    signup(app);
    login(app);
    getUser(app);
    getAllUsers(app);
    editUser(app);
    deleteUser(app);
}  