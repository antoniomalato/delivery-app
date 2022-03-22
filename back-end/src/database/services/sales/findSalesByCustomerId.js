const { sale, salesProduct, product } = require('../../models/index');
const constructorError = require('../../utils/constructorError');

const findSalesByCustomerId = async (id) => {
  const find = await sale.findAll(
      {
        where: { id: id },
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
          }
        ]
      }
  );
  
  if (!find) throw constructorError(404, 'Invalid Id, try again!');

  return find
}

module.exports = {
  findSalesByCustomerId,
};

