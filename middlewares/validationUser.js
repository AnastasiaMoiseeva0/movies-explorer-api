const { celebrate, Joi } = require('celebrate');

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: false, ignoreLength: true }),
    password: Joi.string().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: false, ignoreLength: true }),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: false, ignoreLength: true }),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validationCreateUser,
  validationUpdateUser,
  validationLogin,
};
