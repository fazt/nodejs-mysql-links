import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { pool } from "../database.js";
import { matchPassword } from "./helpers.js";

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (!rows.length) {
        await req.setFlash("error", "No user found");
        return done(null, false);
      }

      const user = rows[0];
      const validPassword = await matchPassword(password, user.password);

      if (!validPassword) {
        await req.setFlash("error", "Incorrect Password");
        return done(null, false);
      }

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
