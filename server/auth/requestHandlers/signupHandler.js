const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true })

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

const signupHandler = async (req, res, next) => {
  const {error, value} = schema.validate(req.body);
  if (error) {
    // body not valid
    res.status(422);
    next(new Error(error));
  } else {
    const result = await users.findOne({ username: req.body.username });
    if (result) {
      // username exists
      res.status(409);
      next(new Error('Username already exits !!!'));
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
      const newUser = {
        username: req.body.username.trim(),
        password: hashedPassword
      };
      // insert into db
      const insertedUser = await users.insert(newUser);
      delete newUser.password;
      res.json(insertedUser);
    }
  }
}

module.exports = signupHandler;