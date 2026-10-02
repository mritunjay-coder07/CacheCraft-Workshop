const express = require('express');
const router = express.Router();

const { cacheMiddleware } = require('../Middleware/middleWare.js');

const {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProductController,
    removeProduct
} = require("../Controller/controllers.js");

router.get(
    "/products",
    cacheMiddleware,
    getProducts
);

router.get(
    "/products/:id",
    cacheMiddleware,
    getProduct
);

router.post(
    "/products",
    postProduct
);

router.put(
    "/products/:id",
    putProduct
);

router.patch(
    "/products/:id",
    patchProductController
);

router.delete(
    "/products/:id",
    removeProduct
);

module.exports = router;