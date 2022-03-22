const { user } = require('../../models/index');
const constructorError = require('../../utils/constructorError');
const { schemaUser } = require('../../utils/joiValidations');
const md5 = require('md5');
const { createToken } = require('../../utils/jsonWebToken');

// const validateUser = (name, email, password, role) => {
//   const { error } = schemaUser.validate({ name, email, password, role })
//   if(error) throw constructorError(400, error.message);
//   return true;
// }

const createUserService = async ({ name, email, password, role = 'customer' }) => {
  const { error } = schemaUser.validate({ name, email, password })
  if(error) throw constructorError(400, error.message);
  const token = createToken({ name, email, role })
  const findEmail = await user.findOne({ where: { email }});
  // const findName = await user.findOne({ where: { name }});

  if (findEmail) throw constructorError(409, 'User with this e-mail already registered');
  // if (findName) throw constructorError(409, 'User with this name already registered');

  // const hashMd5 = md5(password);
  password = md5(password);
  await user.create({ name, email, password, role });

  return { name, email, token, role};
};

module.exports = {
  createUserService,
};
