const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('saleproject', 'root', null,{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async() =>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the databbase: ', error);
    }
}
module.exports = connectDB;