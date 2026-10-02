const fs = require('fs/promises');
const path = require('path');


const file_path  = path.join(__dirname,"..","Database","db.json");

const cache_path = path.join(__dirname,"..","Database","cache.json");

async function readCache (){
    const caches = await fs.readFile(cache_path,'utf-8');
    return JSON.parse(caches);
}

async function writeCache(key,value){
    const caches = await readCache();

    const  newCaches = [...caches,{
        url : key,
        product : {
            dateAdded : Date.now(),
            product : value
        }
    }]

    await fs.writeFile(cache_path,JSON.stringify(newCaches,null,2),'utf-8');
    return;
}

async function readData(){
    const data = await fs.readFile(file_path,'utf-8');
    return JSON.parse(data);
}

async function getAllProducts(){
    const allProducts = await readData()
    return allProducts
}


async function getProductById(id){
    const allProducts  = await readData()

    const product = allProducts.find((x)=>x.id === id);
    console.log(product);

    return product;
}

module.exports = {getAllProducts,getProductById,readCache,writeCache};