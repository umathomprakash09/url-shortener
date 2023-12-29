const Sequelize = require('sequelize');
require('dotenv').config();
var env = process.env || {};
//const UserModel = require('./User');
const URLShortenerModel = require('./URLShortener')
const UserModel = require('./User')

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
     {
       host: process.env.DB_HOST,
       dialect: 'mysql',
       operatorsAliases: false,
       timezone: '+05:30', // for writing to the db
       dialectOptions: {
        dateStrings: true, // disable mysql conversion
        typeCast: true, // Overwrite the sequelize conversion, look at the code, currently only affects date and GEOMETRY, can be used
        },

     pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        },
        logging: env.ENVIRONMENT == 'dev' ? false : false,
        benchmark: true
     }
   );

   const db = {
    URLShortener: URLShortenerModel.init(sequelize,Sequelize),
    User: UserModel.init(sequelize,Sequelize)
   }


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;