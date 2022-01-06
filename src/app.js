import express from "express";
import morgan from "morgan";
import path from "path";
import { create } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import expressMySQLSession from "express-mysql-session";
import { database, port } from "./config";
import routes from "./routes";
import "./lib/passport";

// Intializations
const MySQLStore = expressMySQLSession(session);
const app = express();

// Settings
app.set("port", port);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  }).engine
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "faztmysqlnodemysql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

// Routes
app.use(routes);

// Public
app.use(express.static(path.join(__dirname, "public")));

export default app;
