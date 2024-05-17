import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    howToUse: { type: String, required: true },
    Ingredients: { type: String, required: true },

    price: {
        type: Number,
        default: 0,
        required: true,
    },

    discount: {
        type: Number,
        default: 0,
    },

    imgUrl: { type: String, allow: ("") },

    imgAlt: { type: String, allow: ("") },

    category: {
        type: String,
        enum: ['All Products', 'Face', 'Eyes', 'Body', 'Hands', 'Feet'],
        default: 'All Products',
        required: true
    },

    faves: [String],

    totalQuantity: { type: Number, default: 0 },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('products', productSchema);

export default Product;
