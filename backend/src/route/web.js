import express from 'express';
//import homeController from '../controllers/homeController';


let router = express.Router();

// app truyen vao la mot ung dung cua server
let initWebRoutes = (app) =>{
    // router.get('/', homeController.getHomePage);

    // return app.use('/', router);
}

module.exports = initWebRoutes;