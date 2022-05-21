import userService from '../service/userService'

let handleLogin = async (req, res)=>{
    let phonenumber = req.body.phonenumber;
    let password = req.body.password;
    if(!phonenumber || !password){
        return res.status(500).json({
            errcode:1,
            message: 'Missing your phone number or password!'
        })
    }
    let userData = await userService.handleLogin(phonenumber, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user?userData.user:{}
    }) 
}

let handleRegister = async (req, res)=>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleUpdateUser = async(req, res)=>{
    let message = await userService.handleUpdateUser(req.body);
    return res.status(200).json(message);
}

let handleChangePassword = async(req, res)=>{
    let message = await userService.handleChangePassword(req.body);
    return res.status(200).json(message);
}

let getUserInformation = async(req, res)=>{
    if(!req.body.id){
        return res.status(500).json({
            errcode:1,
            message: 'Missing user id!'
        })
    }
    let userData = await userService.getUserInformation(req.body.id);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user?userData.user:{}
    }) 
}

let getSomeProduct = async(req, res)=>{
    let userData = await userService.getSomeProduct(req.body);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    }) 
}

let getCommentsByProductId = async(req, res)=>{
    let userData = await userService.getCommentsByProductId(req.body.productId, req.body.star);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    }) 
}

let searchProductByName = async(req, res)=>{
    let userData = await userService.searchProductByName(req.body.key);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    }) 
}

let searchProductByType = async(req, res)=>{
    let userData = await userService.searchProductByType(req.body.typeId);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    }) 
}

let getAllType = async(req, res)=>{
    let userData = await userService.getAllType();
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        data: userData.data?userData.data:[]
    }) 
}

module.exports = {
    handleLogin:handleLogin,
    handleRegister:handleRegister,
    handleUpdateUser:handleUpdateUser,
    handleChangePassword:handleChangePassword,
    getUserInformation:getUserInformation,
    getSomeProduct:getSomeProduct,
    getCommentsByProductId:getCommentsByProductId,
    searchProductByName:searchProductByName,
    searchProductByType:searchProductByType,
    getAllType:getAllType
}