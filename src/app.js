import express from "express";
import morgan from "morgan";
import path from "path";
import { create } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import expressMySQLSession from "express-mysql-session";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import { port } from "./config.js";
import "./lib/passport.js";
import * as helpers from "./lib/handlebars.js";
import { pool } from "./database.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MySQLStore = expressMySQLSession(session);

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers
  }).engine
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("faztmysqlnodemysql"));
app.use(
  session({
    secret: "faztmysqlnodemysql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.error = req.flash("error");
  app.locals.errors = req.flash("errors");
  app.locals.user = req.user;
  next();
});

app.use(routes);

app.use(express.static(path.join(__dirname, "public")));

export default app;
