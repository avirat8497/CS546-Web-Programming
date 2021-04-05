const express  = require('express');
const books = require('../data/books');
const router = express.Router();
const booksData = require('../data/books');

function checksforbooks(title,author,genre,datePublished,summary)
{
    if (!title || !author || !genre || !datePublished || !summary){
        throw`Some parameters are missing`
    }
    if (typeof title !== 'string' && title == "")
    {
        throw `Invalid Title`
    }
    
    if (typeof author !== 'object')
    {
        throw`Type of author should be an object`
    }

    if(!author.authorFirstName || !author.authorLastName || typeof author.authorFirstName !== 'string' || typeof author.authorLastName !== 'string')
    {
        throw`Author has invalid first and last name`
    }

    if(author.authorFirstName == "" || author.authorLastName == "")
    {
    
        throw`Author has invalid first and last name`
    }

    if(Array.isArray(genre) == false || genre.length == 0)
    {
        throw`Genre should be an array with atleast one genre`
    }

    for (i = 0; i<genre.length;i++){
        if (typeof genre[i] !== 'string'){
            throw`Elements of the genre are not string`
        }

        if (genre[i] == ''){
            throw `An element in genre is not a valid string`
        }
    }

    if (typeof datepublished !== 'string'){
        throw `Date Published is not of the correct type`
    }
    parsedDate = Date.parse(datePublished);
    if(isNaN(parsedDate)){
        throw`Not a valid date`
    }

    if(typeof summary !== 'string'){
        throw `Invalid Summary`
    }
}


function checkId(id){
    if (!id || typeof id!== 'string' && id == ""){
        throw `Id Invalid`
    }
    if (objectId.isValid(id) !== true){
        throw`Id not valid`
    }
}

function checkDate(datePublished){
    dates = datePublished.split("/");
    month = Number(dates[0]);
    day = Number(dates[1]);
    year = Number(dates[2]);

    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){}
    else {
        if ((month == 02 || month == 2) && day == 29 ){
            throw `date invalid`
        }
    } 
}

router.get('/',async (req,res) => {
    try {
        const book = await booksData.getAllBooks();
        res.json(book)
    }catch(e){
        res.status(500).send()
    }
});

router.get('/:id',async (req,res) => {
    try {
        const getbyId = await booksData.getBookbyID(req.params.id);
        res.json(getbyId);
    }catch(e){
        res.status(404).send({message: e})
    }
});

router.post('/',async (req,res) => {
    try {
        const books = await booksData.AddBook(data.title,data.author,data.genre,data.datePublished,data.summary);
        res.json(books);
    }catch(e){
        res.status(400).send({message: e})
    }
});


router.put('/:id',async(req,res)=>{

    data = req.body;
try {
    checksforbooks(data.title,data.author,data.genre,data.datePublished,data.summary)
    checkDate(data.datePublished)
}catch(e){
    res.status(400).send({"Error":e})
    return;
}

try {
     await booksData.getBookbyID(req.params.id);
}catch(e){
    res.status(404).send({message: e})
    return;
}

try {
    const books = await booksData.putBookbyId(req.params.id,data.title,data.author,data.genre,data.datePublished,data.summary);
    res.json(books);
}catch(e){
    res.status(500).send({message: e})
}
});

router.patch('/:id',async (req,res) => {
    data = req.body
    let updateobject = {}
    try {
        const oldBook = await booksData.getBookbyID(req.params.id);
    }catch(e){
        res.status(404).json({error : e})
    }

    try {
    
    if(data.title && data.title !== oldBook.title){
        updateobject.title = data.title;
    }

    if(data.author.authorFirstName && data.authorFirstName !== oldBook.author.authorFirstName){
        authorFirstName = data.author.authorFirstName
    }
    else {
        authorFirstName = oldBook.author.authorFirstName
    }

    if(data.author.authorLastName && data.authorLastName !== oldBook.author.authorLastName){
        authorLastName = data.author.authorLastName
    }
    else {
        authorLastName = oldBook.author.authorLastName
    }

    if(authorFirstName && authorLastName)
    {
        updateobject.author = {authorFirstName: authorFirstName, authorLastName: authorLastName}

    }
    
    if(data.genre)
    {
        let arraySet = new Set()
        for(i=0; i < oldBook.genre.length; i++)
        {
            arraySet.add(oldBook.genre[i])
        }
        for(i=0; i < data.genre.length; i++)
        {
            arraySet.add(dat.genre[i])
        }
        updateobject.genre = Array.from(arraySet)
    }
    if(data.datePublished)
    {
        data.datePublished = new Date(data.datePublished)
        if (data.datePublished !== oldBook.datePublished)
        {
            updateobject.datePublished = data.datePublished
        }
    }
    if (data.summary && data.summary !== oldBook.summary)
    {
        updateobject.summary = data.summary
    }
    if(Object.keys(updateobject).length !==0)
    {
        try{
            await booksData.getBookbyID(req.params.id)
        } catch (e){
            res.status(404).send({message: "Book not found"})
            return;
        }
        try{
            const book = await booksData.patchBoookbyId(req.params.id, updateobject);
            res.json(book)
        } catch (e) {
            res.status(500).json({error: e})
        }
    }
    else{
        res.status(400).send({Error: "PATCH body requires atleast one field"})
        return;
    }
    }catch(e){
        res.status(404).send({message: e});

    }
});


router.delete('./:id',async (req , res) => {

    try {
        id = req.params.id
        const deletedBook = await booksData.deleteBookById(id);
        if (deletedBook === 1){
            res.json({"bookId": id, "deleted": true})
        }
    }catch(e){
        console.log(e)
        res.status(500).send({message: e})

    }

});

module.exports = router;