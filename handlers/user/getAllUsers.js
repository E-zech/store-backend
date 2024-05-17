import User from '../../models/User.js';
import { guard, adminGuard } from '../../middleware/guard.js';

const getAllUsers = app => {
    app.get('/users', guard, adminGuard, async (req, res) => {
        try {
            const allUsers = await User.find().select('-password');
            res.send(allUsers);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}
export default getAllUsers;

