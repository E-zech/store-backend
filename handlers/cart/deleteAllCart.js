import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import User from '../../models/User.js';

const deleteAllCart = app => {
    app.delete('/cart/delete-all', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const user = await User.findById(userId);

            if (userId.toString() !== user._id.toString()) {
                return res.status(401).send('you dont have premission to do so');
            }

            user.addToCart = [];
            await user.save();
            res.send(user);

        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    })
}

export default deleteAllCart;
