import jwt from 'jsonwebtoken';
import chalk from 'chalk';

export const getUserFromTKN = (req, res) => {
    if (!req.headers.authorization) {
        console.error(chalk.red("Authentication failed: Authorization header missing."));
        return res.status(401).send('User not authenticated');
    }

    try {
        const token = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
        return token;

    } catch (error) {
        console.error(chalk.red("Error:", error.message));
        return res.status(401).send('User not Authorized / config.js');
    }
};


