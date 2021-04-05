const mongoCollection = require('../config/mongoCollections');

const books = mongoCollection.books;
const reviews = mongoCollection.reviews;

let objectId = require('mongodb').ObjectID;


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

async function getAllBooks(){
    const bookCollection = await books();
    const bookList = await bookCollection.find({},{projection : {_id: 1,title: 1 } }).toArray();
    for (i = 0;i<bookList.length;i++){
        bookList[i]._id = bookList[i]._id.toString();
    }
    return bookList;
}

async function AddBook(title,author,genre,datePublished,summary){

    checksforbooks(title,author,genre,datePublished,summary);
    checkDate(datePublished);
    let reviews = []
    let newbook = {
        title: title,
        author: author,
        genre: genre,
        datePublished: new Date(datePublished),
        summary: summary,
        reviews: reviews
    };

    const bookCollection = await books();
    const insertInfo = await bookCollection.insetOne(newbook);

    if(insertInfo.insertCount == 0){
        throw`Error`
    }
    let newId = insertInfo.insertId
    newId = newId.toString();
    const newinsertedbook = await this.getBookbyID(newId)
    return newinsertedbook;
}

async function getBookbyID(id){
    checkId(id);
    const bookCollection = await books();
    const bookbyid = await bookCollection.findOne({_id: objectId(id)})
    if (bookbyid == null){
        throw `Book not found`
    }
    else {
        bookbyid._id = bookbyid._id.toString();
        bookbyid.datePublished = bookbyid.datePublished.toLocaleDateString();
        return bookbyid;
    }
}


async function putBookbyId(id,title,author,gnere,datePublished,summary){
    book = await this.getBookbyID(id)
    reviewsArr = books.reviews

    let updateData = {}

    updateData.title = title,
    updateData.author = author,
    updateData.genre = genre,
    updateData.datePublished = new Date(datePublished),
    updateData.summary = summary,
    updateData.reviews = reviewsArr

    const bookCollection = await books();
    const isUpdate = await bookCollection.updateOne({_id: objectId(id)}, {$set: updateData} );

    if (isUpdate.matchedCount > 0){
        return await this.getBookbyID(id);
    }
}

async function deleteBookById(id){
    checkId(id)
    const bookCollection = await books();
    const reviewCollection = await reviews();


    const book = await bookCollection.findOne({_id: objectId(id)})
    if(book === null){
        throw `Book not found`
    }

    let allReviews = book.reviews


    for (i = 0;i<allReviews.length;i++){
        allReviews[i] = objectId(allReviews[i])
    }

    const deleteBook = await bookCollection.findOneAndDelete({_id: objectId(id)});
    const deletedReviews = await reviewCollection.deleteMany({"_id":{"$in":allReviews}})

    return 1;
}


async function patchBookById(id,updateobject){

    const bookCollection = await books();
    const isUpdated = await bookCollection.updateOne({_id: objectId(id)}, {$set: updateobject});

    if (isUpdated.matchedCount > 0){
        return await this.getBookbyID(id);
    }
    else {
        throw`Update not possible`
    }

}
module.exports = {
    getAllBooks,AddBook,getBookbyID,putBookbyId,deleteBookById,patchBookById
}

