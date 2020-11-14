const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

function respond422(res, next) {
  res.status(422);
  const error = new Error('Unable to LogIn.');
  next(error);
}

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  };
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
    if (err) {
      // a 500 error if token not generated
      next(new Error('Something went wrong...Try again!!!'));
    } else {
      // respond with the generated token
      res.json({ token });
    }
  });
}

async function signupHandler (req, res, next) {
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
    createTokenSendResponse(insertedUser, res, next);
  }
}

async function loginHandler(req, res, next) {
  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const matchedpassword = await bcrypt.compare(req.body.password, user.password);
    if (matchedpassword) {
      createTokenSendResponse(user, res, next);
    } else {
      respond422(res, next);
    }
  } else {
    respond422(res, next);
  }
}

module.exports = {
  signupHandler,
  loginHandler,
};
