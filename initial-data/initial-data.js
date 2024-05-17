import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import bcrypt from 'bcrypt';
import { users } from './initial-dataUsers.js';
import { products } from './initial-dataProducts.js';
import { orders } from './initial-dataOrders.js';

export const initialDataStart = async () => {
    const userAmount = await User.countDocuments();

    if (!userAmount) {
        for (const u of users) {
            const hashedPassword = await bcrypt.hash(u.password, 10);
            u.password = hashedPassword;

            const user = new User(u);
            await user.save();
        }

        const savedProducts = await Product.insertMany(products);
        for (const order of orders) {
            const [firstName, lastName] = order.fullName.split(' ');
            const user = await User.findOne({ firstName, lastName });

            if (user) {
                order.userId = user._id;

                for (const orderProduct of order.products) {
                    const product = savedProducts.find(p => p.title === orderProduct.title);
                    orderProduct.productId = product._id;
                }

                const newOrder = new Order(order);
                await newOrder.save();
            } else {
                console.log(`User not found for order with fullName: ${order.fullName}`);
            }
        }
    }
};
