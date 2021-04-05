const express = require('express');
const app = express();
const configRoutes = require ('./routes/shows');

configRoutes(app);

app.listen (3000, () => {
    console.log("We have a server");
    console.log("your routes will be running on http://localhost:3000");
});