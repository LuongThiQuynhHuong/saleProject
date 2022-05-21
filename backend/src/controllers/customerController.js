import customerService from '../service/customerService';

let addNewItem = async(req, res)=>{
    let message = await customerService.addNewItem(req.body);
    return res.status(200).json(message);
}

let deleteProduct = async(req, res)=>{
    let message = await customerService.deleteProduct(req.body);
    return res.status(200).json(message);
}

let updateCart = async(req, res)=>{
    let message = await customerService.updateCart(req.body);
    return res.status(200).json(message);
}

let addNewAddress = async(req, res)=>{
    let message = await customerService.addNewAddress(req.body);
    return res.status(200).json(message);
}

let setAddressDefault = async(req, res)=>{
    let message = await customerService.setAddressDefault(req.body);
    return res.status(200).json(message);
}

let deleteAddress = async(req, res)=>{
    let message = await customerService.deleteAddress(req.body.id);
    return res.status(200).json(message);
}

let getCart = async(req, res)=>{
    let userData = await customerService.getCart(req.body.userId);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    })
}

let getAddress = async(req, res)=>{
    let userData = await customerService.getAddress(req.body.userId);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    })
}

let addNewComment = async(req, res)=>{
    let message = await customerService.addNewComment(req.body);
    return res.status(200).json(message);
}

let addNewBill = async(req, res)=>{
    let message = await customerService.addNewBill(req.body);
    return res.status(200).json(message);
}

let addItemIntoBill = async(req, res)=>{
    let message = await customerService.addItemIntoBill(req.body);
    return res.status(200).json(message);
}

let completeBill = async(req, res)=>{
    let message = await customerService.completeBill(req.body);
    return res.status(200).json(message);
}

module.exports = {
    addNewItem:addNewItem,
    deleteProduct:deleteProduct,
    updateCart:updateCart,
    addNewAddress:addNewAddress,
    setAddressDefault:setAddressDefault,
    deleteAddress:deleteAddress,
    getCart:getCart,
    getAddress:getAddress,
    addNewComment:addNewComment,
    addNewBill:addNewBill,
    addItemIntoBill:addItemIntoBill,
    completeBill:completeBill
}

