
const shows = require('../data/shows');

const constructorMethod = app => {

    app.get('/shows',async(req , res) => {
        try {
            let showsList = await shows.shows();
            res.json(showsList);
    
        }catch(e){
            res.status(500).send();
        }
    });

 app.get ('/shows/:id', async (req , res) =>{
    
    try{
        id = Number(req.params.id) 
        if (id < 1){
        throw `Invalid ID`
     }

        const show_id = await shows.getshowsid(req.params.id);
        res.json(show_id);
        //console.log('kavit');
    }
    catch(e){
        if (e === "Invalid ID"){
            res.status(400).json({message : "Invalid ID given"});
        }
else {
    res.status(500).send();
}
    }
});

const about = {
    "name" : "Avirat Belekar",
    "cwid" : "10454332",
    "biography" : "Hello, I am Avirat Belekar. I study at Stevens Institute of Technology. I am graduate student there studying masters in Computer Science. I am originally from Mumbai,India. \n My hobbies include playing Counter Strike Gloabl Offensive. My friends are really good at it but i am slowly trying to get there. I love going to places with my friends and also enjoy cooking. I can cook delicious Indian Biryani.",
    "favoriteShows" : ["Breaking Bad", "Suits", "The Office", "Greys Anatomy","House of Cards"]
} 

app.get("/aboutme", (req, res) => {
    try{res.json(about)}
    catch(e){
        res.status(500).send();
    }
})

app.use('*',(req,res) => {
    res.status(404).json ({error : "Resource not found"})
});

}

module.exports = constructorMethod;