const { product } = require('../../models');

// get all products

const getAllProducts = async () =>  await product.findAll({});
 

module.exports = {
  getAllProducts,
};
