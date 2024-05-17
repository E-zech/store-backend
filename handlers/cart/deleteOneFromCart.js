import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import User from '../../models/User.js';

const deleteOneFromCart = app => {
    app.delete('/cart/delete/:id', guard, async (req, res) => {
        try {
            const productId = req.params.id;

            if (!productId) {
                return res.status(400).send('Please provide a valid product ID');
            }

            const { userId } = getUserFromTKN(req, res);
            const user = await User.findById(userId);

            const filteredCart = user.addToCart.filter(item => item.productId.toString() !== productId);

            if (user.addToCart.length === filteredCart.length) {
                return res.status(404).send('Product is not found in the cart');
            }

            user.addToCart = filteredCart;
            await user.save();
            res.send(user);

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
}

export default deleteOneFromCart;
