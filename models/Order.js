import mongoose from 'mongoose';
import { AddToCartSchema } from './shared/AddToCart.js';

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    fullName: {
        type: String, required: true
    },

    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        imgAlt: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    }],

    paymentDetails: {
        nameOnCard: {
            type: String,
            required: true
        },
        cardLast4Digits: {
            type: String,
            required: true
        }
    },

    fullAddress: {
        type: String,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;