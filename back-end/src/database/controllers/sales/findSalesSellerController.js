const { findSalesSellerById } = require('../../services/sales/findSalesSellerService');

module.exports = async(req, res, next) => {
  try {
    const { id } = req.params;
    const find = await findSalesSellerById(id);
    return res.status(200).json(find);
  } catch (error) {
    return next(error);
  };
};
