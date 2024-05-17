import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';

const getCartProducts = app => {
    app.get('/cart', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send('User is not found')
            }

            const allProducts = await Product.find();

            const products = user.addToCart.map(item => {
                const product = allProducts.find(prod => prod._id.toString() === item.productId.toString());
                if (product) {
                    return {
                        ...product.toObject(),
                        quantity: item.quantity,
                        price: item.price,
                        addedAt: item.addedAt,
                        status: item.status,
                    };
                }
            }).filter(Boolean);

            res.send(products);

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};

export default getCartProducts;



