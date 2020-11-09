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
      .pattern(new RegExp('^[a-zA-Z0-9@#$%^&*]{8,30}$')),
});

const signupHandler = (req, res, next) => {
  const {error, value} = schema.validate(req.body);
  if (error) {
    res.status(422);
    next(new Error(error));
  } else {
    // insert in db
    res.json(value);
  }
}

module.exports = signupHandler;