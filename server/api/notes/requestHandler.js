function getAllByUser(req, res, next) {
  res.json({
    message: 'notes api',
    user: req.user,
  });
}

module.exports = {
  getAllByUser,
};