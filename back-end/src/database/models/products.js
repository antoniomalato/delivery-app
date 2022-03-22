const products = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    url_image: DataTypes.STRING,
  },
  {tableName: 'products'});
  
  return product;
}

module.exports = products;
