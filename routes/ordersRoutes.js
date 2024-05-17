import createOrder from "../handlers/order/createOrder.js";
import getOrders from "../handlers/order/getOrders.js";

export default function orderRoutes(app) {
    createOrder(app);
    getOrders(app);
};     