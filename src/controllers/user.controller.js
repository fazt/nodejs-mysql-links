const userCtrl = {};

userCtrl.renderUserProfile = (req, res, next) => {
  res.render('profile');
}

module.exports = userCtrl;