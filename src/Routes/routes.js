const express = require('express');
const router = express.Router();
const {cacheMiddleWare} = require('../Middleware/middleWare.js')

const {getProducts,getProduct} = require("../Controller/controllers.js")

router.get("/products",cacheMiddleWare,getProducts);

router.get("/products/:id",cacheMiddleWare,getProduct);

module.exports = router;


