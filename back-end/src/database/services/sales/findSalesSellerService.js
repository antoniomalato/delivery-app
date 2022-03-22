const { sale, salesProduct, product } = require('../../models/index');
const constructorError = require('../../utils/constructorError');

const findSalesSellerById = async (seller_id) => {
  const findSalesSeller = await sale.findAll({ 
    where: { id: seller_id }, 
    include: [
      {
        model: salesProduct,
        as: 'products',
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
          model: product,
          as: 'products',
        }
      ]
      },
    ]
  });
  if (!findSalesSeller) throw constructorError(404, 'Seller not found');
  return findSalesSeller;
}

module.exports = { findSalesSellerById };
