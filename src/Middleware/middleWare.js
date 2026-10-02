const {readCache,writeCache} = require('../Service/services.js')

async function cacheMiddleWare(req,res,next){
    
    let cache = await readCache();

    key = req.url;

    let urlCache = cache.find((x)=> {
        return x.url == key
    })

    if (urlCache){
        if (Date.now() - urlCache.product.dateAdded < (60 * 1000)){
            return res.status(200).json(urlCache.product.product);
        }
    }

    next();
}

module.exports = {cacheMiddleWare};

