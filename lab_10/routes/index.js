const routes = require('./session');
const path = require("path");
const cookieParser = require('cookie-parser');


const constructorMethod = app => {
app.use(cookieParser());
app.use("/",routes);
app.use("/private",routes,cookieParser);
app.use('/logout',routes);
app.use("*",(req,res) => {
    res.status(404).json({error: "404 not found"});
});
};

module.exports = constructorMethod;