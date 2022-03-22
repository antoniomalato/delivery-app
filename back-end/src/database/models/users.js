const user = (sequelize, DataTypes) => {
  const users = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {tableName: 'users'});

  user.associate = (models) => {
    user.hasMany(models.sale,
      {
        foreignKey: 'user_id',
        as: 'user_id',
      }
    );
    user.hasMany(models.sale,
      {
        foreignKey: 'seller_id',
        as: 'seller_id',
      }  
    );
  }
  return users;
}

module.exports = user;

