const md5 = require('md5');
const { user } = require('../../models/index');
const constructorError = require('../../utils/constructorError');
const { schemaLogin } = require('../../utils/joiValidations');
const { createToken } = require('../../utils/jsonWebToken');

const loginUserService = async ({ email, password }) => {
  const { error } = schemaLogin.validate({ email, password });
  if (error) throw constructorError(400, error.message);

  const find = await user.findOne({ where: { email } });

  if (!find) throw constructorError(404, 'User not found');

  const findObject = find.dataValues;

  if (findObject.password !== md5(password)) throw constructorError(403, 'Incorrect Password');
  
  delete findObject.createdAt;
  delete findObject.updatedAt;
  const token = createToken(findObject);
  
  const completeAnswer = {
    id: findObject.id,
    name: findObject.name,
    email: findObject.email,
    role: findObject.role,
    token,
  };

  return completeAnswer;
};

module.exports = {
  loginUserService,
};
