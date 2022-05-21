import bcrypt from 'bcryptjs';
import db from '../models/index';
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await isPhonenumberExist(data.phonenumber);
            if (isExist === true) {
                resolve({
                    errCode: 1,
                    message: 'The phone number is already used!'
                });
            }
            else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    phonenumber: data.phonenumber,
                    password: hashPassword,
                    email: data.email,
                    fullname: data.fullname,
                    dateOfBirth: data.dateOfBirth,
                    gender: data.gender === '1' ? true : false, // 0: male, 1: female
                    roleId: data.roleId
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

let isPhonenumberExist = (phonenumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phonenumber: phonenumber }
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

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

let getUserInformation = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await isUserIdExist(id);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { id: id },
                    attributes: ['id', 'phonenumber', 'fullname', 'email', 'dateOfBirth', 'gender'],
                    raw: true
                });
                if (user) {
                    userData.errCode = 0;
                    userData.message = 'Ok';
                    userData.user = user;
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

let handleLogin = (phonenumber, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await isPhonenumberExist(phonenumber);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { phonenumber: phonenumber },
                    attributes: ['id', 'phonenumber', 'password', 'fullname', 'roleId'],
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'Ok';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3
                        userData.message = 'Wrong password!';
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.message = `User's not found!`;
                }
            }
            else {
                userData.errCode = 1
                userData.message = `Your phone number does not exist!`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let handleUpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.phonenumber) {
                resolve({
                    errCode: 2,
                    message: 'Your phone number is required!'
                });
            }
            else {
                let user = await db.User.findOne({
                    where: { phonenumber: data.phonenumber },
                    raw: false
                });
                if (user) {
                    user.fullname = data.fullname;
                    user.email = data.email;
                    user.dateOfBirth = data.dateOfBirth;
                    user.gender = data.gender;
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the user information successfully!'
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: 'User is not found!'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}

let handleChangePassword = (data) => {
    //check old password
    //change password
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.phonenumber) {
                resolve({
                    errCode: 4,
                    message: 'Your phone number is required!'
                });
            }
            else {
                let isExist = await isPhonenumberExist(data.phonenumber);
                if (isExist) {
                    let user = await db.User.findOne({
                        where: { phonenumber: data.phonenumber },
                        attributes: ['phonenumber', 'password'],
                        raw: true
                    });
                    if (user) {
                        let check = await bcrypt.compareSync(data.oldPassword, user.password);
                        if (check) {
                            let hashPassword = await hashUserPassword(data.newPassword);
                            let user = await db.User.findOne({
                                where: { phonenumber: data.phonenumber },
                                raw: false
                            });
                            if (user) {
                                user.password = hashPassword;
                                await user.save();
                                resolve({
                                    errCode: 0,
                                    message: 'Update your password successfully!'
                                });
                            }
                            else {
                                resolve({
                                    errCode: 1,
                                    message: 'User is not found!'
                                });
                            }

                        }
                        else {
                            resolve({
                                errCode: 3,
                                message: 'Wrong password!'
                            });
                        }
                    }
                    else {
                        resolve({
                            errCode: 2,
                            message: `User's not found!`
                        });
                    }
                }
                else {
                    resolve({
                        errCode: 1,
                        message: 'User is not found!'
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getSomeProduct = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let retData={};
            let products = await db.Product.findAll({ 
                attributes:['id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'],
                offset: (data.page-1)*data.limit, 
                limit: parseInt(data.limit),
                subQuery:false,
                raw : true                
            });
            if(products.length > 0){
                retData.errCode = 0;
                retData.message = `Ok!`;
                retData.data = products
                resolve(retData);
            }else{
                retData.errCode = 1;
                retData.message = `No product was found!`;
                resolve(retData);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getCommentsByProductId = (id, star)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let retData={};
            let comments = await db.Comment.findAll({ 
                where: {productId: id, star:star},
                attributes:['userId', 'comment', 'time'],
                raw : true                
            });
            if(comments.length > 0){
                retData.errCode = 0;
                retData.message = `Ok!`;
                retData.data = comments
                resolve(retData);
            }
            else{
                retData.errCode = 1;
                retData.message = `No comment was found!`;
                resolve(retData);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let searchProductByName = (key)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let retData={};
            let products = await db.Product.findAll({ 
                where:{
                    name:{[Op.like]: '%' + key + '%'}
                },
                attributes:['id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'],
                raw : true                
            });
            if(products.length > 0){
                retData.errCode = 0;
                retData.message = `Ok!`;
                retData.data = products
                resolve(retData);
            }else{
                retData.errCode = 1;
                retData.message = `No product was found!`;
                resolve(retData);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let searchProductByType = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let retData={};
            let products = await db.Product.findAll({ 
                where:{
                    typeId: id
                },
                attributes:['id', 'name', 'describe', 'qty', 'imgUrl','price','typeId','brand'],
                raw : true                
            });
            if(products.length > 0){
                retData.errCode = 0;
                retData.message = `Ok!`;
                retData.data = products
                resolve(retData);
            }else{
                retData.errCode = 1;
                retData.message = `No product was found!`;
                resolve(retData);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllType = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let retData={};
            let types = await db.Category.findAll({ 
                attributes:['id', 'name'],
                raw : true                
            });
            if(types.length > 0){
                retData.errCode = 0;
                retData.message = `Ok!`;
                retData.data = types
                resolve(retData);
            }else{
                retData.errCode = 1;
                retData.message = `No type was found!`;
                resolve(retData);
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    handleLogin: handleLogin,
    handleUpdateUser: handleUpdateUser,
    handleChangePassword: handleChangePassword,
    getUserInformation: getUserInformation,
    getSomeProduct:getSomeProduct,
    getCommentsByProductId:getCommentsByProductId,
    searchProductByName:searchProductByName,
    searchProductByType:searchProductByType,
    getAllType:getAllType,
}

// return new Promise(async(resolve, reject)=>{
//     try {
        
//     } catch (e) {
//         reject(e);
//     }
// });

