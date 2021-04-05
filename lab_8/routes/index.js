const searchRoute = require("./showsearch");
const detailRoute = require("./showsdetails");
const path = require("path");

const constructorMethod = app => {
    app.use("/showsearch",searchRoute)
    app.use("/showsdetails",detailRoute)
    app.get("/",(req,res) => {
        res.sendFile(path.resolve("static/site.html"));
    });

    app.use("*",(req,res) => {
        res.status(404).json({error: "404 not found"});
    });
};

module.exports = constructorMethod;