import mongoose from 'mongoose';

export const AddToCartSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, required: true },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
});