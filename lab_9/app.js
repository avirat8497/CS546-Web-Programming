const express = require('express');
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + '/static');

const exphbs = require("express-handlebars");
app.use("/static",static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
configRoutes(app)
app.listen(3000, () => {
    console.log('Connected to server');
})