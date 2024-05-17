import jwt from 'jsonwebtoken';
import { getUserFromTKN } from '../configs/config.js';
import { RoleTypes } from '../models/User.js';

export const guard = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Authentication failed. Please provide a valid token' });
            }

            // Check if token needs to be refreshed
            const currentTime = Math.floor(Date.now() / 1000);
            const { exp, userId } = decoded;
            const bufferTime = 300; // 5 minutes buffer time
            if (exp - currentTime <= bufferTime) {
                // Token is about to expire, refresh it
                const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.setHeader('Authorization', newToken);
            }

            // Token is valid, proceed to the next middleware
            next();
        });
    } catch (error) {
        console.error('Error in guard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const businessGuard = (req, res, next) => { // if the user from the token is business/admin/master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.business || roleType === RoleTypes.admin || roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized / guard.js > businessGuard');
        }
    } catch (error) {
        console.error('Error in businessGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const adminGuard = (req, res, next) => {// if the user from the token is admin/master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.admin || roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized , Admins only / guard.js > adminGuard');
        }
    } catch (error) {
        console.error('Error in adminGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const masterGuard = (req, res, next) => {// if the user from the token is master then he can pass the guard.
    try {
        const { roleType } = getUserFromTKN(req, res);

        if (roleType === RoleTypes.master) {
            next();
        } else {
            return res.status(401).send('User not authorized , Master only / guard.js > masterGuard');
        }
    } catch (error) {
        console.error('Error in masterGuard middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};
