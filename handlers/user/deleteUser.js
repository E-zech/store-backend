import User from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';
import { RoleTypes } from '../../models/User.js';

const deleteUser = app => {
    app.delete('/users/:id', guard, async (req, res) => {
        const { userId, roleType } = getUserFromTKN(req, res);
        const isAdminOrMaster = roleType === RoleTypes.admin || roleType === RoleTypes.master;

        if (!req.params.id) {
            return res.status(400).send("Invalid or missing user ID");
        }

        if (userId !== req.params.id && !isAdminOrMaster) {
            return res.status(401).send('you are not authorized to do so');
        }

        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            if (!deletedUser) {
                return res.status(404).send('User not found');
            }

            const message =
                req.params.id === userId
                    ? `It's sad to see you leaving, ${deletedUser.firstName} 🫤`
                    : isAdminOrMaster
                        ? `You have deleted ${deletedUser.firstName} successfully.`
                        : `It's sad to see you leaving, ${deletedUser.firstName} 🫤`;

            res.send({ message, deletedUser });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default deleteUser; 
