const express = require("express");
const bodyParser = require("body-parser");
const CookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
var configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true
}))

app.use((req,res,next) => {
    var text;
    if(req.session.user == null || req.session.user === ''){
        text = "user not authenticated"
    }
    else {
        text = "user authenticated"
    }
    console.log(new Date().toUTCString(),req.method,req.originalUrl,text);
    next();
})

configRoutes(app);

app.listen(3000, () => {
    console.log("We have a server");
});