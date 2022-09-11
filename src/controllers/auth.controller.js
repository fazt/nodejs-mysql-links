import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

export const renderSignUp = (req, res) => {
  res.render("auth/signup");
};

export const signUp = async (req, res, next) => {
  const { fullname, email, password1, password2 } = req.body;

  if (password1 !== password2) {
    req.flash("message", "Passwords do not match");
    return res.redirect("/signup");
  }

  const newUser = {
    fullname,
    email,
  };

  newUser.password = await encryptPassword(password1);

  // Saving in the Database
  const [result] = await pool.query("INSERT INTO users SET ? ", newUser);
  newUser.id = result.insertId;

  req.login(newUser, (err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/profile");
  });
}

export const renderSignIn = (req, res, next) => {
  res.render("auth/signin");
};

export const signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureMessage: true,
  failureFlash: true,
});

export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
