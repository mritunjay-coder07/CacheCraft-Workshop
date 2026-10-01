const express = require('express');
const app = express();
const fs = require('fs/promises');
const path = require('path');
const port = 3000;

let filepath = path.join(__dirname,"db.json")
let cache = {}


async function readData(){
    let data = await fs.readFile(filepath,'utf-8')
    return JSON.parse(data);
}

async function delayReadData(){
    await new Promise((resolve, reject) => {
        setTimeout( resolve, 1500)
    })
    return await readData()
}

app.get('/products', async (req, res) => {
    let key = req.url
    let value = cache[key]
    try{
        if (value){
            return res.json(value)
        }
        let products = await delayReadData()
        cache[key] = products
        return res.json(products);
    }
    catch(err){
        console.log(err)
    }
});

app.get('/products/:id', async (req, res) => {
    let key = req.url
    let value = cache[key]

    try{
        if (value){
            return res.json(value)
        }
        
        let id = parseInt(req.params.id);
        let products = await delayReadData()
        let product = products.find((p) => p.id === id);
        cache[key] = product

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.json(product);
    }
    catch(err){
        console.log(err)
    }
    
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




