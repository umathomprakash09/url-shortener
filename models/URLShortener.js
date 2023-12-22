const { Sequelize, DataTypes } = require("sequelize");

//const sequelize = require('../config/config')
class URLShortener extends Sequelize.Model{
   static init(sequelize, DataTypes){
    return super.init(
        {
            id: {
              type: DataTypes.INTEGER(11).UNSIGNED,
              autoIncrement: true,
              primaryKey: true,
            },
            url: {
              type: DataTypes.TEXT,
              defaultValue: null,
            },
            short_url: {
                type: DataTypes.STRING, 
                defaultValue: null,
            }
          },
     {
        modelName: 'URLShortener',
        tableName: 'url_shorteners',
        underscored: true,
        sequelize,
    }
     );
   }
}


module.exports = URLShortener