const bcrypt = require('bcryptjs');

const { users } = require('./shared');

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
    delete newUser.password;
    res.json(insertedUser);
  }
}

module.exports = signupHandler;