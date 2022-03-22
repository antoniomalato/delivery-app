const { findSalesByCustomerId } = require('../../services/sales/findSalesByCustomerId');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const {sale_id} = req.body
    // const { name } = req.body;
    const findClient = await findSalesByCustomerId(id);
    return res.status(200).json(findClient);
  } catch (error) {
    return next(error);
  };
};

