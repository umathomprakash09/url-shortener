const express = require('express');
require('dotenv').config()
const models = require('./models');

const userRoute = require('./routes/v1/user-routes');

const app = express();
const errorHandler = require('./middlewares/error-handler');
app.use(express.json());

app.listen(process.env.APP_PORT,()=>{
    console.log("App is running on port: ",process.env.APP_PORT);
});

models.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
 models.sequelize.sync().then(() => {
     console.log('Nice Database looks fine!');
  }).catch((error) => {
     console.error('Unable to create table : ', error);
  });
 


app.use('/user',userRoute);
app.use(errorHandler);