const fs = require('fs/promises');
const path = require('path')
const cache_path = path.join(__dirname,"..","Database","cache.json");


const {getAllProducts,getProductById,readCache,writeCache} = require("../Service/services.js");
const { writeFile } = require('fs');


async function getProducts(req,res){
    try{

        const allProducts = await getAllProducts();
        let key = req.url;


        await writeCache(key,allProducts);
        return res.status(200).json(allProducts);
    }

    catch(err){
        console.log(err)
        return res.status(500).json({
            message : "Interval Server error"
        })
    }
}


async function getProduct(req,res){
    try{
        const id = Number(req.params.id);
        const product =await getProductById(id);

        
        
        if (!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        
        await writeCache(key,product);
        
        return res.status(200).json(product);
    }
    catch(err){

        console.log(err)
        return res.status(500).json({
            message : "Interval Server error"
        })

    }
}

module.exports = {getProducts,getProduct};

