import User, { RoleTypes } from '../../models/User.js';
import { getUserFromTKN } from '../../configs/config.js';
import { UserEditValid } from '../../validation/userJoi.js';
import { guard } from '../../middleware/guard.js';

const editUser = app => {
    app.put('/users/:id', guard, async (req, res) => {
        const { userId, roleType } = getUserFromTKN(req, res);
        const isMaster = roleType === RoleTypes.master;

        const paramsId = req.params.id;

        if (userId !== paramsId && !isMaster) {
            return res.status(401).send('You are not authorized to update this user');
        }

        try {
            const { error, value } = UserEditValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                return res.status(400).send(errorObj);
            }

            const updateUser = await User.findById(userId);
            if (!updateUser) {
                return res.status(404).send('User not found');
            }

            value.roleType = updateUser.roleType;

            updateUser.set(value);
            await updateUser.save();

            const user = {
                ...updateUser.toObject(),
                password: undefined,
            };

            res.send(user);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default editUser;
