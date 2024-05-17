import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';

const getUser = app => {
    app.get('/users/:id', guard, async (req, res) => {
        const { userId, roleType } = getUserFromTKN(req, res);
        const isAdminOrMaster = roleType === roleType.admin || roleType === roleType.master;;

        if (userId !== req.params.id && !isAdminOrMaster) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const userByParams = await User.findById(req.params.id).select('-password');
            if (!userByParams) {
                return res.status(403).send('User not found');
            }

            res.send(userByParams);
        }

        catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getUser;

