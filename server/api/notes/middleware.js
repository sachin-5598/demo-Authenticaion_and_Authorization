const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string()
      .trim()
      .min(1)
      .max(100)
      .required(),
  note: Joi.string()
      .trim()
      .required(),
});

function validateNote(req, res, next) {
  const result = schema.validate(req.body);
  if (result.error) {
    // body not valid
    res.status(422);
    return next(result.error);
  }
  next();
}

module.exports = {
  validateNote,
};