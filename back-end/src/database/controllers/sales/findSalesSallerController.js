const { findSalesSellerById } = require('../../services/sales/findSalesSellerService');

module.exports = async(req, res, next) => {
  try {
    const { seller_id } = req.params;
    const find = await findSalesSellerById(seller_id);
    return res.status(200).json(find);
  } catch (error) {
    return next(error);
  }
}