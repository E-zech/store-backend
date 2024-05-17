import Product from '../../models/Product.js';

const getProduct = app => {
    app.get('/products/:id', async (req, res) => {
        try {
            const paramsId = req.params.id;

            if (!paramsId) {
                return res.status(400).send('Invalid product ID');
            }

            const product = await Product.findOne({ _id: paramsId });

            if (!product) {
                return res.status(404).send('Product not found');
            }

            res.send(product);

        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    });
}

export default getProduct;