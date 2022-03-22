const { user } = require('../../models/index');


const findAllUser = async () => await user.findAll({});

module.exports = {
  findAllUser,
};
