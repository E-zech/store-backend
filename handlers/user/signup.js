import User from '../../models/User.js';
import { UserValid } from '../../validation/userJoi.js';
import bcrypt from 'bcrypt';

const signup = app => {
    app.post('/signup', async (req, res) => {
        try {
            const { error, value } = UserValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const { email, password } = value;

            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).send('Email already exists');
            }

            const newUser = new User({
                ...value,
                password: hashedPassword,
            });

            await newUser.save();

            res.send(newUser);

        } catch (err) {

            return res.status(500).send('Internal Server Error');
        }
    });
};

export default signup;


