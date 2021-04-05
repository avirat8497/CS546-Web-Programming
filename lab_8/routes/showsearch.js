const shows = require("../data/shows");
const express = require('express');
const axios = require("axios");
const router = express.Router();

function checkShow(show){
    if (show.language === null){
        show.language = 'N/A';
    }
    if (show.genres.length === 0){
        show.genres.length = ['N/A'];
    }
    if (show.rating === null){
        show.rating = 'N/A';
    }
    if (show.network === null){
        show.network = 'N/A';

    }if (show.summary === null){
        show.summary = 'N/A';
    }
    return show;
}

router.post("/", async(req,res) => {
    try{
        let showsList = await shows.getshowsbyterm(req.body.id);
        console.log(req.body);
        console.log(showsList);
        res.render("site/search",{showsList: showsList});
    }
    catch(e){
        res.status(500).send();
    }
});
router.get("/:id", async(req,res) => {
    try{
    const showbyid = await shows.getshowsid(req.params.id);
    console.log(showbyid);
    if(showbyid === undefined){
        res.render("site/error",{message : "No Show Found"});
    }
    else{
        res.render("site/details",{showbyid: showbyid});
    }
    }
    catch(e){
        res.render("site/error",{error:e});
    }
});


module.exports = router;