const sales = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    total_price: DataTypes.DECIMAL(10, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {tableName: 'sales'})

  sale.associate = (models) => {
    sale.belongsTo(models.user,
      {
        foreignKey: 'user_id',
        as: 'user',
      }
    );
    sale.belongsTo(models.user,
      {
        foreignKey: 'seller_id',
        as: 'seller',
      }
    );

    sale.hasMany(models.salesProduct,
      {
        foreignKey: 'sale_id',
        as: 'products'
      }
    )
  }
  return sale;
}

module.exports = sales;
