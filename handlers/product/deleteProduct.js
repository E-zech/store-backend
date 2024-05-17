import Product from '../../models/Product.js';
import { guard, adminGuard } from '../../middleware/guard.js';

const deleteProduct = app => {
    app.delete('/products/:id', guard, adminGuard, async (req, res) => {
        try {
            const productIdByParams = req.params.id;

            if (!productIdByParams) {
                return res.status(400).send('Invalid product ID');
            }
            const product = await Product.findById(productIdByParams);

            if (!product) {
                return res.status(403).send('product not found');
            }

            const deletedproduct = await Product.findByIdAndDelete(productIdByParams);

            const message = `You have deleted "${product.title}" successfully.`
            res.send({ message, deletedproduct });

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default deleteProduct;