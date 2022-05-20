import bodyParser from "body-parser";
import express from "express";
import connectDB from './config/connectDB';
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";

require('dotenv').config(); //giup chay duoc process.env

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969; //lay port tu file .env

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port:" + port)
});
