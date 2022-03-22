const { updateStatus} = require('../../services/sales/updateStatusSalesService');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status_sale } = req.body;
     
    const salesUpdate = await updateStatus(id, status_sale);
    return res.status(201).json(salesUpdate);
  
  } catch (error) {
    return next(error);
  }
}