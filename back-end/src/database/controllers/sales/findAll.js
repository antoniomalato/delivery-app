const { findAll } = require('../../services/sales/findAll');

module.exports = async (_req, res, next) => {
  try {
    const find = await findAll();
    return res.status(200).json(find);
  } catch (error) {
    return next(error);
  }
};
