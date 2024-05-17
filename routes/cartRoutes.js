import add2cart from '../handlers/cart/add2cart.js';
import getCartProducts from '../handlers/cart/getCartProducts.js';
import deleteOneFromCart from '../handlers/cart/deleteOneFromCart.js';
import deleteAllCart from '../handlers/cart/deleteAllCart.js';

export default function cardRoutes(app) {
    add2cart(app);
    getCartProducts(app);
    deleteOneFromCart(app);
    deleteAllCart(app);
};  