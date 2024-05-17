import mongoose from 'mongoose';
import { AddToCartSchema } from './shared/AddToCart.js';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    roleType: {
        type: Number,
        default: 2,
    },

    phone: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    addToCart: [AddToCartSchema],

    city: {
        type: String,
        required: true,
    },

    street: {
        type: String,
        required: true,
    },

    houseNumber: {
        type: Number,
        required: true,
    },

    zip: {
        type: String,
        required: true,
    },

    imgSrc: {
        type: String,
        maxlength: 555,
    },

    imgAlt: {
        type: String,
        maxlength: 100,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model("users", userSchema);
export default User;


export const RoleTypes = {
    none: 1,
    business: 2,
    admin: 3,
    master: 4,
};

