const checkRoutes = require('./check');

const constructorMethod = (app) => {
    app.use('/',checkRoutes);
    app.use('*',(req,res) => {
        res.redirect('/');
    });
};
module.exports = constructorMethod;