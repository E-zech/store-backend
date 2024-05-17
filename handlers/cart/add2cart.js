import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';

const add2cart = app => {
    app.post('/cart/add', guard, async (req, res) => {
        try {
            const { products } = req.body;
            const { userId } = getUserFromTKN(req, res);
            const user = await User.findById(userId);

            const updatedCartProducts = await Promise.all(products.map(async (item) => {
                const { productId, quantity, price } = item;

                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    return res.status(400).send('Invalid product ID');
                }

                if (!price) {
                    return res.status(400).send('Please provide a valid price');
                }

                if (!quantity || quantity < 1) {
                    return res.status(400).send('Please provide a valid quantity, must be bigger than 0');
                }

                const product = await Product.findById(productId);

                if (!product) {
                    return res.status(404).send('Product not found');
                }

                const existingCartItem = user.addToCart.find(item => item.productId.toString() === productId);

                if (existingCartItem) {
                    existingCartItem.quantity = quantity;
                    existingCartItem.price = price;

                } else {
                    user.addToCart.push({ productId, quantity, price });
                }

                return {
                    ...product.toObject(),
                    quantity,
                    price,
                };
            }));

            await user.save();

            res.send(updatedCartProducts.filter(Boolean));
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};

export default add2cart;

