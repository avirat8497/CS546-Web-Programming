var express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use("/public",static);
app.use(express.json());
app.use(express.urlencoded());
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

configRoutes(app);
app.listen(3000, () => {
     console.log('We have a server now');
     console.log("All your routes are running on http://localhost:3000");
 });