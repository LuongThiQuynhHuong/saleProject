import salerService from '../service/salerService';

let addNewProduct = async(req, res)=>{
    let message = await salerService.addNewProduct(req.body);
    return res.status(200).json(message);
}

let addNewType = async(req, res)=>{
    let message = await salerService.addNewType(req.body.name);
    return res.status(200).json(message);
}

let updateProductInfo = async(req, res)=>{
    let message = await salerService.updateProductInfo(req.body);
    return res.status(200).json(message);
}


module.exports = {
    addNewProduct:addNewProduct,
    addNewType:addNewType,
    updateProductInfo:updateProductInfo,
}