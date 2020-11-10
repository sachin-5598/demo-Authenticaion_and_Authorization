const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string()
      .trim()
      .pattern(new RegExp('^[a-zA-Z0-9_]+$'))
      .min(2)
      .max(30)
      .required(),
  password: Joi.string()
      .trim()
      .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*]{8,30}$'))
      .required(),
});

function validateBody(req, res, next) {
  const result = schema.validate(req.body);
  if (result.error) {
    // body not valid
    res.status(422);
    if (req.originalUrl.includes('login')) {
      const error = new Error('Unable to LogIn!!!');
      return next(error);
    }
    return next(result.error);
  }
  next();
}

module.exports = {
  validateBody
};