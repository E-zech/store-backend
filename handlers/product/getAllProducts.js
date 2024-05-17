import Product from '../../models/Product.js';

const getAllProducts = app => {
    app.get('/products', async (req, res) => {
        try {
            const allProducts = await Product.find();

            if (!allProducts || allProducts.length === 0) {
                return res.status(404).send('products not found');
            }

            res.send(allProducts);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getAllProducts;