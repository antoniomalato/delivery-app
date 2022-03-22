const { sale } = require('../../models/index');

const findAll = async () => await sale.findAll();

module.exports = {
  findAll,
};
