const signupHandler = (req, res, next) => {
  console.log(req.body);
  res.json({
    message: 'signup in progress'
  });
}

module.exports = signupHandler;