const fs = require('fs/promises');
const path = require('path');

const file_path = path.join(__dirname, "..", "Database", "db.json");
const cache_path = path.join(__dirname, "..", "Database", "cache.json");

async function readCache() {
    const caches = await fs.readFile(cache_path, 'utf-8');
    return JSON.parse(caches);
}

async function writeCache(key, value) {
    const caches = await readCache();

    const newCaches = [
        ...caches,
        {
            url: key,
            product: {
                dateAdded: Date.now(),
                product: value
            }
        }
    ];

    await fs.writeFile(
        cache_path,
        JSON.stringify(newCaches, null, 2),
        'utf-8'
    );
}

async function readData() {
    const data = await fs.readFile(file_path, 'utf-8');
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(
        file_path,
        JSON.stringify(data, null, 2),
        'utf-8'
    );
}

async function createProduct(product) {
    const allProducts = await readData();

    const newId = allProducts.length > 0
        ? Math.max(...allProducts.map(x => x.id)) + 1
        : 1;

    const newProduct = {
        id: newId,
        ...product
    };

    allProducts.push(newProduct);

    await writeData(allProducts);

    return newProduct;
}

async function updateProduct(id, product) {
    const allProducts = await readData();

    const index = allProducts.findIndex(
        x => x.id === id
    );

    if (index === -1) {
        return null;
    }

    const updatedProduct = {
        id: id,
        ...product
    };

    allProducts[index] = updatedProduct;

    await writeData(allProducts);

    return updatedProduct;
}

async function patchProduct(id, product) {
    const allProducts = await readData();

    const index = allProducts.findIndex(
        x => x.id === id
    );

    if (index === -1) {
        return null;
    }

    const updatedProduct = {
        ...allProducts[index],
        ...product,
        id: id
    };

    allProducts[index] = updatedProduct;

    await writeData(allProducts);

    return updatedProduct;
}

async function deleteProduct(id) {
    const allProducts = await readData();

    const index = allProducts.findIndex(
        x => x.id === id
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = allProducts[index];

    allProducts.splice(index, 1);

    await writeData(allProducts);

    return deletedProduct;
}

async function clearCache() {
    await fs.writeFile(
        cache_path,
        JSON.stringify([], null, 2),
        'utf-8'
    );
}

async function getAllProducts() {
    const allProducts = await readData();
    return allProducts;
}

async function getProductById(id) {
    const allProducts = await readData();

    const product = allProducts.find(
        x => x.id === id
    );

    return product;
}

module.exports = {
    getAllProducts,
    getProductById,
    readCache,
    writeCache,
    readData,
    writeData,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    clearCache
};