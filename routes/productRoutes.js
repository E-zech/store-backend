import getAllProducts from '../handlers/product/getAllProducts.js';
import getFavesProducts from '../handlers/product/getFavesProducts.js';
import getProduct from '../handlers/product/getProduct.js';
import createProduct from '../handlers/product/createProduct.js';
import editProduct from '../handlers/product/editProduct.js';
import likeProduct from '../handlers/product/likeProduct.js';
import deleteProduct from '../handlers/product/deleteProduct.js';

export default function cardRoutes(app) {
    getAllProducts(app);
    getFavesProducts(app);
    getProduct(app);
    createProduct(app);
    editProduct(app);
    likeProduct(app);
    deleteProduct(app);
}; 