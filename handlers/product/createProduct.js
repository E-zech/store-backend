import Product from '../../models/Product.js';
import { ProductValid } from '../../validation/productJoi.js';
import { guard, adminGuard } from '../../middleware/guard.js';

const createProduct = app => {
    app.post('/products', guard, adminGuard, async (req, res) => {
        try {
            const { error, value } = ProductValid.validate(req.body, { abortEarly: false });

            if (error) {
                const errorObj = error.details.map(err => err.message.replace(/['"]/g, ''));
                console.log(errorObj);
                return res.status(400).send(errorObj);
            }

            const newProduct = new Product({
                ...value,
            });

            await newProduct.save();

            res.send(newProduct);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default createProduct;