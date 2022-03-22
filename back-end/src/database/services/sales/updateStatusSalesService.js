const constructorError = require('../../utils/constructorError');
const { sale } = require('../../models/index');

const updateStatus = async(id, status_sale) => {
  const findID = await sale.findOne({ where: { id: id } });
  if(!findID) throw constructorError(404, 'Sale not found');
  await sale.update({status : status_sale}, {where : { id: id }});
  const updatedSales = await sale.findOne({ where: { id: id } });
  
  return updatedSales;
}

module.exports = { updateStatus };
