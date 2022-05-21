import db from '../models/index';


let isEnoughProduct= (id, qty)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where: {id: id},
                raw: true
            });
            if(product.qty < qty){
                resolve(false);
            }
            else{
                resolve(true);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let addNewItem = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where: {id: data.productId},
                raw: true
            });
            if(!product){
                resolve({
                    errCode: 1,
                    message: 'Product does not exist!'
                });
            }
            let price = product.price;
            let item = await db.ItemInCart.findOne({
                where: {
                    userId: data.userId,
                    productId: data.productId
                }
            });            
            if(item){
                let newQty = parseInt(item.qty) + parseInt(data.qty);
                let check = await isEnoughProduct(data.productId, newQty);
                if(!check){
                    resolve({
                        errCode: 2,
                        message: 'Not enough product!'
                    });
                }
                else{
                    item.qty = newQty;
                    item.total = newQty * price;
                    await item.save();
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
            }
            else{
                let check = await isEnoughProduct(data.productId, data.qty);
                if(!check){
                    resolve({
                        errCode: 2,
                        message: 'Not enough product!'
                    });
                }
                else{
                    let totalPrice = price * data.qty; 
                    await db.ItemInCart.create({
                        qty: data.qty,
                        productId: data.productId,
                        userId: data.userId,
                        isChosen: false,
                        total: totalPrice
                    });
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}
 
let deleteProduct = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.ItemInCart.findOne({
                where: {  
                    productId: data.productId,
                    userId: data.userId
                }
            });
            if (product){
                await db.ItemInCart.destroy({
                    where: {  
                        productId: data.productId,
                        userId: data.userId
                    }
                });
            }
            resolve({
                errCode: 0,
                message: `The product is deleted from your cart!`
            })
        } catch (e) {
            reject(e);
        }
    });
}

let updateCart = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let product = await db.Product.findOne({
                where: {id: data.productId},
                raw: true
            });
            if(!product){
                resolve({
                    errCode: 1,
                    message: 'Product does not exist!'
                });
            }
            let price = product.price;
            let item = await db.ItemInCart.findOne({
                where: {
                    userId: data.userId,
                    productId: data.productId
                }
            });            
            if(item){
                let check = await isEnoughProduct(data.productId, data.qty);
                if(!check){
                    resolve({
                        errCode: 2,
                        message: 'Not enough product!'
                    });
                }
                else{
                    item.qty = data.qty;
                    item.total = data.qty * price;
                    await item.save();
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
            }
            else{
                let check = await isEnoughProduct(data.productId, data.qty);
                if(!check){
                    resolve({
                        errCode: 2,
                        message: 'Not enough product!'
                    });
                }
                else{
                    let totalPrice = price * data.qty; 
                    await db.ItemInCart.create({
                        qty: data.qty,
                        productId: data.productId,
                        userId: data.userId,
                        isChosen: false,
                        total: totalPrice
                    });
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}

let isAddressExist = (userId, address, phonenumber, receiver)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let a = await db.Address.findOne({
                where: {
                    userId: userId,                        
                    address:address,
                    phonenumber:phonenumber,
                    receiver:receiver
                }
            });
            if (a){
                resolve(true);
            }
            else{
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let addNewAddress = (data) =>{
    return new Promise(async (resolve, reject)=>{
        try {
            if(data.address){
                let check = await isAddressExist(data.userId, data.address, data.phonenumber, data.receiver);
                if(check){
                    resolve({
                        errCode: 2,
                        message: `The addresss is exist!`
                    });
                }
                else {
                    let temp = await db.Address.findOne({
                        where: {
                            userId: data.userId
                        }
                    });
                    if(temp){
                        if(data.isDefault){
                            let address = await db.Address.findOne({
                                where: {
                                    userId: data.userId,                        
                                    isDefault: true
                                }
                            });
                            if(address){
                                address.isDefault = false;
                                await address.save();
                            }
                        }
                        await db.Address.create({
                            userId: data.userId,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            receiver: data.receiver,
                            isDefault: data.isDefault
                        });
                        resolve({
                            errCode: 0,
                            message: 'Ok!'
                        });
                    }
                    else{
                        await db.Address.create({
                            userId: data.userId,
                            address: data.address,
                            phonenumber: data.phonenumber,
                            receiver: data.receiver,
                            isDefault: true
                        });
                        resolve({
                            errCode: 0,
                            message: 'Ok!'
                        });
                    }                
                }
            }
            resolve({
                errCode: 1,
                message: `Must fill in address field!`
            });
        } catch (e) {
            reject(e);
        }
    });
}

let setAddressDefault = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let address = await db.Address.findOne({
                where: {id: data.id}
            });
            if(!address){
                resolve({
                    errCode: 1,
                    message: `The address does not exist!`
                });
            }
            else{
                if(address.isDefault === true){
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
                else{
                    let temp = await db.Address.findOne({
                        where: {
                            userId: data.userId,                        
                            isDefault: true
                        }
                    });
                    if(temp){
                        temp.isDefault = false;
                        await temp.save();
                    }
                    address.isDefault = true;
                    await address.save();
                    resolve({
                        errCode: 0,
                        message: 'Ok!'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}

let deleteAddress=(id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let address = await db.Address.findOne({
                where: {id: id}
            });
            if (address){
                await db.Address.destroy({
                    where: {id: id}
                });
            }
            resolve({
                errCode: 0,
                message: `Delete address successful!`
            })
        } catch (e) {
            reject(e);
        }
    });
}

let getCart=(id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {};
            let isExist = await isUserIdExist(id);
            if (isExist) {
                let cart = await db.ItemInCart.findAll({
                    where: { userId: id },
                    attributes: ['qty', 'productId', 'userId', 'isChosen', 'total'],
                    raw: true
                });
                if (cart) {
                    userData.errCode = 0;
                    userData.message = 'Ok!';
                    userData.data = cart;
                }
                else {
                    userData.errCode = 1;
                    userData.message = `User's not found!`;
                }
            }
            else {
                userData.errCode = 1
                userData.message = `User's not found!`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let isUserIdExist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            });
            if (user) {
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

let getAddress=(id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {};
            let isExist = await isUserIdExist(id);
            if (isExist) {
                let address = await db.Address.findAll({
                    where: { userId: id },
                    attributes: ['id','userId', 'address', 'phonenumber', 'receiver', 'isDefault'],
                    raw: true
                });
                if (address) {
                    userData.errCode = 0;
                    userData.message = 'Ok!';
                    userData.data = address;
                }
                else {
                    userData.errCode = 1;
                    userData.message = `User's not found!`;
                }
            }
            else {
                userData.errCode = 1
                userData.message = `User's not found!`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let addNewComment = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            await db.Comment.create({
                productId: data.productId,
                userId: data.userId,
                comment: data.comment,
                time: Date.now(),
                star: data.star
            });
            resolve({
                errCode: 0,
                message: 'Ok!'
            });
        } catch (e) {
            reject(e);
        }
    });
}

let addNewBill = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let bill = await db.Bill.create({
                userId: data.userId,
                addressId: data.addressId,
                status: false,
                time: Date.now(),
                total: 0,
                raw:true
            });
            resolve({
                errCode: 0,
                message: 'Ok!',
                billId: bill.id
            });
        } catch (e) {
            reject(e);
        }
    });
}


let addItemIntoBill = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let items = await db.ItemInCart.findAll({
                where: { 
                    userId: data.userId, 
                    isChosen: true
                },
                attributes: ['qty', 'productId', 'total'],
                raw: true
            });
            if(items.length===0){
                resolve({
                    errCode: 1,
                    message: 'Please choose product in your cart to buy!',
                });
            }else{
                for(let i = 0; i<items.length; i++){
                    await db.ItemInBill.create({
                        billId:data.billId,
                        userId: data.userId,
                        productId: items[i].productId,
                        qty: items[i].qty,
                        total: items[i].total
                    });
                }
                //delete Item in bill out of cart
                for(let i = 0; i<items.length; i++){
                    await deleteProduct({productId: items[i].productId, userId: data.userId});
                }
                let sumPrice = 0
                for(let i = 0; i<items.length; i++){
                    sumPrice += items[i].total
                }
                resolve({
                    errCode: 0,
                    message: 'Ok!',
                    totalPrice: sumPrice
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let completeBill = (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let bill = await db.Bill.findOne({
                where: {id: data.billId}
            });
            if(bill){
                resolve({
                    errCode: 1,
                    message: 'Error in complete your bill! Pleaze do again!',
                });
            }else{
                bill.total = data.totalPrice;
                await bill.save();
                resolve({
                    errCode: 0,
                    message: 'Ok!'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
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
    addNewBill,addNewBill,
    addItemIntoBill:addItemIntoBill,
    completeBill:completeBill
}

// return new Promise(async (resolve, reject)=>{
//     try {
        
//     } catch (e) {
//         reject(e);
//     }
// });