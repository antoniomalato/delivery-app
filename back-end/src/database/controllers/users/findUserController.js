const { findAllUser } = require('../../services/users/findAllUser');

module.exports = async (_req, res, next) => {
try {
  // const { } = req.body;
  const find = await findAllUser();

  return res.status(200).json(find);
} catch (error) {
  return next(error);
}

};
