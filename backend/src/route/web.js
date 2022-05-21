import express from 'express';
import userController from '../controllers/userController';
import customerController from '../controllers/customerController';
import salerController from '../controllers/salerController';
import adminController from '../controllers/adminController'



let router = express.Router();

// app truyen vao la mot ung dung cua server
let initWebRoutes = (app) =>{

    //////////////////// All users ///////////////////////////////
    //phonenumber, password, email, fullname, dateOfBirth, gender, roleId
    router.post('/api/register', userController.handleRegister); 

    //phonenumber, password
    router.post('/api/login', userController.handleLogin);

    //phonenumber, oldPassword, newPassword
    router.post('/api/change-password', userController.handleChangePassword);

    //phonenumber, fullname, email, dateOfBirth, gender
    router.put('/api/update-user-information', userController.handleUpdateUser);

    //id
    router.get('/api/user-information', userController.getUserInformation);
    // return user{'id', 'phonenumber', 'fullname', 'email', 'dateOfBirth', 'gender'}

    //page, limit
    router.get('/api/get-some-product', userController.getSomeProduct);
    // return data[{'id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'}]

    //productId, star
    router.get('/api/get-comments-by-productId', userController.getCommentsByProductId);
    // return data[{'userId', 'comment', 'time'}]

    //key
    router.get('/api/search-product-by-name', userController.searchProductByName);
    // return data[{'id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'}]

    //typeId
    router.get('/api/search-product-by-type', userController.searchProductByType);
    // return data[{'id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'}]
    

    router.get('/api/get-all-type', userController.getAllType);
    // return data[{'id', 'name'}]

    ////////////////// Saler /////////////////////////////////////
    // name, describe, qty, imgUrl, price, typeId, brand
    router.post('/api/add-product', salerController.addNewProduct);

    //name
    router.post('/api/add-type', salerController.addNewType);

    //id, name, describe, qty, imgUrl, price, typeId, brand
    router.put('/api/update-product-information', salerController.updateProductInfo);

    ////////////////// Customer /////////////////////////////////////
    // qty, productId, userId
    router.post('/api/add-into-cart', customerController.addNewItem);

    //productId, userId
    router.delete('/api/delete-product-in-cart', customerController.deleteProduct);

    // qty, productId, userId
    router.put('/api/update-cart', customerController.updateCart);

    // userId
    router.get('/api/get-cart', customerController.getCart);
    // return data [{'qty', 'productId', 'userId', 'isChosen', 'total'}]

    // userId, address, phonenumber, receiver, isDefault
    router.post('/api/add-address', customerController.addNewAddress);

    // id, userId
    router.put('/api/set-address-default', customerController.setAddressDefault);

    // id
    router.delete('/api/delete-address', customerController.deleteAddress);

    // userId
    router.get('/api/get-addresses', customerController.getAddress);
    // return data[{'id','userId', 'address', 'phonenumber', 'receiver', 'isDefault'}]

    //productId, userId, comment, star
    router.post('/api/add-comment', customerController.addNewComment);

    //userId,addressId
    router.post('/api/add-bill', customerController.addNewBill);
    // return billId: int

    // *****
    //userId, billId
    router.post('/api/add-item-into-bill', customerController.addItemIntoBill);
    //return totalPrice: float

    // *****
    //totalPrice, billId
    router.put('/api/complete-bill', customerController.completeBill);

    return app.use('/', router);
}

module.exports = initWebRoutes;