const { Sequelize, DataTypes } = require("sequelize");

//const sequelize = require('../config/config')
class User extends Sequelize.Model{
   static init(sequelize, DataTypes){
    return super.init({
        id: {
         type: DataTypes.INTEGER(11).UNSIGNED,
         autoIncrement: true,
         primaryKey: true
        },
        uuid: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
       },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
        },
        accessToken: {
          type: DataTypes.STRING
        }
    },
     {
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        sequelize,
    }
     );
   }
}


module.exports = User