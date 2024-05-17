import { getUserFromTKN } from '../../configs/config.js';
import { guard } from '../../middleware/guard.js'
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

const createOrder = app => {
    app.post('/create/order', guard, async (req, res) => {
        try {
            const { userId } = getUserFromTKN(req, res);
            const { fullName, products, paymentDetails, fullAddress, totalPrice } = req.body;

            const orderProducts = products.map(product => ({
                productId: product.productId,
                title: product.title,
                quantity: product.quantity,
                price: product.price,
                imgUrl: product.imgUrl,
                imgAlt: product.imgAlt,
                discount: product.discount
            }));

            const order = new Order({
                userId: userId,
                fullName: fullName,
                products: orderProducts,
                paymentDetails: paymentDetails,
                fullAddress: fullAddress,
                totalPrice: totalPrice
            });

            await order.save();

            for (const productItem of products) {
                const product = await Product.findById(productItem.productId);
                if (product) {
                    product.totalQuantity -= productItem.quantity;
                    await product.save();
                }
            }

            res.send(order);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
};


export default createOrder;


