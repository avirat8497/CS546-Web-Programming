const shows = require("../data/shows");
const express = require('express');
const axios = require("axios");
const router = express.Router();

router.post("/",async(req , res) => {
    try{
        if(req.body.searchTerm.length === 0){
            res.status.render('site/error',{message : "Provide a term to search"});
        }
        let showsList = await shows.getshowsbyterm(req.body.searchTerm);
        if(showsList.length === 0){
            res.render('site/error',{term: req.body.searchTerm});
        }
        else{
            res.status(500).render("site/search",{showsList: showsList,
            term: req.body.searchTerm,
        });
        }
    }catch(e){
        res.render("site/error",{error:e});
    }
});

module.exports = router;