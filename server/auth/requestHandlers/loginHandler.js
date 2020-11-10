const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { users } = require('./shared');

function respond422(res, next) {
  res.status(422);
  const error = new Error('Unable to LogIn!!!@@..');
  next(error);
}

async function loginHandler(req, res, next) {
  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const matchedpassword = await bcrypt.compare(req.body.password, user.password);
    if (matchedpassword) {
      const payload = {
        _id: user._id,
        username: user.username
      };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
        if (err) {
          // a 500 error if token not generated
          next(new Error('Unable to LogIn!!!'));
        } else {
          // respond with the generated token
          res.json({ token });
        }
      });
    } else {
      respond422(res, next);
    }
  } else {
    respond422(res, next);
  }
}

module.exports = loginHandler;