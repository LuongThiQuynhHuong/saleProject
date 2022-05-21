import bodyParser from "body-parser";
import express from "express";
import connectDB from './config/connectDB';
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";

const cors = require('cors');
require('dotenv').config(); //giup chay duoc process.env

let app = express();

app.use(
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
  app.options(
    '*',
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969; //lay port tu file .env

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port:" + port)
});
