const jwt = require('jsonwebtoken');
const constructorError = require('./constructorError');
const fs = require('fs');
const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

// cria token JWT

const createToken = (data) => {
  const token = jwt.sign(data, secret, { expiresIn: '24h', algorithm: 'HS256' });
  return token;
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
}

const auth = (req, _res, next) => {
  const { authorization } = req.headers;
  if(!authorization) throw constructorError(403, 'Token not found');
  
  try {
    const decoded = verifyToken(authorization);

    req.user = decoded;
    next();
  } catch (error) {
    next(constructorError(401, 'Expired or invalid token'));
  }
}

module.exports = {
  createToken,
  verifyToken,
  auth,
};
