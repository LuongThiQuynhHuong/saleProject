import db from '../models/index';

let isProductExist = (name, brand, typeId)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where: { 
                    name: name,
                    typeId: typeId,
                    brand:brand
                }
            });
            if (product) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}


let addNewProduct = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            let isExist = await isProductExist(data.name, data.brand, data.typeId);
            if(isExist){
                resolve({
                    errCode: 1,
                    message: 'The product is exist!'
                });
            }
            else{
                await db.Product.create({
                    name: data.name,
                    describe: data.describe,
                    qty: data.qty,
                    imgUrl: data.imgUrl,
                    price: data.price,
                    typeId: data.typeId,
                    brand: data.brand
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}



let isTypeExist = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let typ = await db.Category.findOne({
                where: { name: data }
            });
            if (typ) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}


let addNewType = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            let isExist = await isTypeExist(data);
            if(isExist){
                resolve({
                    errCode: 1,
                    message: 'The type is exist!'
                });
            }
            else{
                await db.Category.create({
                    name: data
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}

let updateProductInfo = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where: {id: data.id}
            });
            if (product) {
                product.name = data.name;
                product.describe = data.describe;
                product.qty = data.qty;
                product.imgUrl = data.imgUrl;
                product.price = data.price;
                product.typeId = data.typeId;
                product.brand = data.brand;
                await product.save();
                resolve({
                    errCode: 0,
                    message: 'Update the product information successfully!'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Product is not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    addNewProduct:addNewProduct,
    addNewType:addNewType,
    updateProductInfo:updateProductInfo
}

// return new Promise(async (resolve, reject)=>{
//     try {
        
//     } catch (e) {
//         reject(e);
//     }
// });