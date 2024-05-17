import Product from '../../models/Product.js';
import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js';

const likeProduct = app => {
    app.patch('/products/faves/:id', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const paramsId = req.params.id;

            const product = await Product.findById({ _id: paramsId });
            if (!product) {
                return res.status(404).send('Product not found');
            }

            const isLikedByUser = product.faves.includes(userId);

            if (isLikedByUser) {
                product.faves = product.faves.filter(id => id.toString() !== userId);

            } else {
                product.faves.push(userId);
            }
            await product.save();
            res.send(product);

        } catch (err) {
            console.log(err)
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default likeProduct;