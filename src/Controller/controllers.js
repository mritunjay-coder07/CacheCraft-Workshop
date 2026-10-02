const {
    getAllProducts,
    getProductById,
    writeCache,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    clearCache
} = require("../Service/services.js");

async function getProducts(req, res) {
    try {
        const allProducts = await getAllProducts();
        let key = req.url;

        await writeCache(key, allProducts);

        return res.status(200).json(allProducts);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

async function getProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        key = req.url
        await writeCache(key, product);

        return res.status(200).json(product);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

async function postProduct(req, res) {
    try {
        const product = req.body;

        const newProduct = await createProduct(product);

        await clearCache();

        return res.status(201).json(newProduct);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

async function putProduct(req, res) {
    try {
        const id = Number(req.params.id);
        const product = req.body;

        const updatedProduct = await updateProduct(id, product);

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await clearCache();

        return res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

async function patchProductController(req, res) {
    try {
        const id = Number(req.params.id);
        const product = req.body;

        const updatedProduct = await patchProduct(id, product);

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await clearCache();

        return res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

async function removeProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const deletedProduct = await deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await clearCache();

        return res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal Server error"
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProductController,
    removeProduct
};