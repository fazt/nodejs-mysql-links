import express from "express";
import morgan from "morgan";
import path from "path";
import { create } from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import session from "express-session";
import expressMySQLSession from "express-mysql-session";
import { promiseConnectFlash } from "async-connect-flash";

import { fileURLToPath } from "url";

import routes from "./routes/index.js";
import "./lib/passport.js";
import * as helpers from "./lib/handlebars.js";
import { SECRET, database } from "./config.js";
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
    helpers,
  }).engine
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("faztmysqlnodemysql"));
console.log(database);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool),
  })
);
app.use(promiseConnectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  app.locals.success = await req.getFlash("success");
  app.locals.error = await req.getFlash("error");
  app.locals.user = req.user;
  next();
});

app.use(routes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error", err);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    status: err.status,
  });
});

export default app;
