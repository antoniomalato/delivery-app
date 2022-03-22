const Joi = require('joi');

const schemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(11).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemaSales = Joi.object({
  user_id: Joi.number(),
  seller_id: Joi.number(),
  total_price: Joi.number().precision(2).required(),
  delivery_address: Joi.string().required(),
  delivery_number: Joi.string().required(),
  sale_date: Joi.required().required(),
  status: Joi.string().required(),
});

module.exports = {
  schemaUser,
  schemaLogin,
  schemaSales,
};
