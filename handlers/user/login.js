import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { userLoginValidation } from '../../validation/userJoi.js';

const login = app => {
    app.post('/users/login', async (req, res) => {
        try {
            const { error, value } = userLoginValidation.validate(req.body, { abortEarly: false });

            if (error) {
                return res.status(400).send("email or password is incorrect");
            };

            const { email, password } = value;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).send("email or password is incorrect");
            };

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(403).send("email or password is incorrect");
            };

            const token = jwt.sign({
                userId: user._id,
                roleType: user.roleType,
            }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.send({
                message: `Hey ${user.firstName}, you have successfully logged in.`,
                token,
            });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}


export default login;

