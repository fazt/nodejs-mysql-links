import app from "./app.js";

await import('./database.js');
app.listen(app.get("port"));
console.log("Server is in port", app.get("port"));
