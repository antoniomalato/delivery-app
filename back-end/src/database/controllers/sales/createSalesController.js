const { createSalesService } = require("../../services/sales/createSalesService");

module.exports = async (req, res, next) => {
  try {
    const create = await createSalesService(req.body);
    
    return res.status(201).json(create);
  } catch (error) {
    return next(error);
  }
};
