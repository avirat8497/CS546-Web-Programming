const mongoCollection = require('../config/mongoCollections');
const books = mongoCollection.books;
const reviews = mongoCollection.reviews;
let objectId = require('mongodb').ObjectID;
const booksData = require('../data/books');


function checksforReview(title,reviewer,bookBeingReviewed,rating,dateOfReview,review)
{
    if (!title || !reviewer || !bookBeingReviewed || !rating || !dateOfReview || !review){
        throw`Some parameters are missing`
    }
    if (typeof title !== 'string')
    {
        throw `Invalid Title`
    }
    
    if (typeof reviewer !== 'string')
    {
        throw`Invalid Reviewer`
    }

    if(typeof bookBeingReviewed !== 'string')
    {
        throw`Invalid bookBeingReviewed`
    }

    if(typeof rating !== 'number' || rating % 1 !== 0 || rating < 1 || rating > 5)
    {
    
        throw`Invalid Rating`
    }

   if (typeof dateOfReview !== 'string'){
       throw `Date of review invalid`
   }

   
    parsedDate = Date.parse(dateOfReview);
    if(isNaN(parsedDate)){
        throw`Not a valid date`
    }

    if(typeof review !== 'string'){
        throw `Invalid review`
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

function removeAllElements(reviewsArr,reviewId){
    let i = reviewsArr.indexOf(reviewId);
    while( i > -1){
        reviewsArr.splice(i,1);
        i = reviewsArr.indexOf(reviewId);
    }
}

async function getAllReviews(reviewIds){

    for(i =0;i <reviewIds.length;i++){
        reviewIds[i] = objectId(reviewIds[i])
    }
    const reviewsCollection = await reviews();
    const allReviews = await reviewsCollection.find({"_id": {"$in": reviewIds}}).toArray();
    for (i = 0;i<allReviews.length;i++){
        allReviews[i]._id = allReviews[i]._id.toString();
    }
    return allReviews;
}

async function AddReview(title,reviewer,bookBeingReviewed,rating,dateOfReview,review){

    checksforReview(title,reviewer,bookBeingReviewed,rating,dateOfReview,review);
    checkId(bookBeingReviewed);
    checkDate(dateOfReview);
    const book = await booksData.getBookbyID(bookBeingReviewed);
    if (book == null){
        throw`Book with this id not found`
    }
    let newreviews = {
        title: title,
        reviewer: reviewer,
        bookBeingReviewed : objectId(bookBeingReviewed),
        rating: rating,
        dateOfReview: new Date(dateOfReview),
        review: review
    };

    const reviewsCollection = await reviews();
    const insertInfo = await reviewsCollection.insetOne(newreviews);
    if(insertInfo.insertCount == 0){
        throw`Cannot add review`
    }
    let newId = insertInfo.insertId
    newId = newId.toString();
    toUpdate = {}
    book.reviews.push(newId);
    toUpdate.reviews = book.reviews;

    const bookCollection = await books();
    const isUpdated = await bookCollection.updateOne({_id: objectId(bookBeingReviewed)}, {$set: toUpdate});
    if(isUpdated.matchedCount > 0){
        reviewobject._id = newId
        return reviewobject;
    }
    else{
        throw `Update not possible`
    }
}

async function getReviewbyID(bookId,reviewId){
    checkId(bookid);
    checkId(reviewId);
    const bookCollection = await books();
    const bookbyid = await bookCollection.findOne({_id: objectId(bookId)})
    if (bookbyid == null){
        throw `Book not found`
    }
    const reviewCollection = await reviews();
    const reviewbyid = await reviewCollection.findOne({_id: objectId(reviewId)})
    if (reviewbyid == null){
        throw `review not found`
    }
    else {
        reviewbyid._id = reviewbyid._id.toString();
        reviewbyid.dateOfReview = reviewbyid.datePublished.toLocaleDateString();
        return reviewbyid;
    }
}

async function deleteReview(bookId,reviewId){
    checkId(bookId);
    checkId(reviewId);
    const bookCollection = await books();
    const reviewCollection = await reviews();


    const book = await bookCollection.findOne({_id: objectId(id)})
    if(book === null){
        throw `Book not found`
    }

    reviewsArr = bookbyid.reviews;
    // const reviewCollection = await reviews();
    const reviewbyid = await reviewCollection.findOneAndDelete({_id: objectId(reviewId)});

    if (reviewbyid.value == null){
        throw`Review unavailable`
    }
    removeAllElements(reviewsArr,reviewId);
    let upateobject = {
        reviews: reviewArr
    }


    const isUpdated = await bookCollection.updateOne({_id: objectId(bookId)}, {$set : updateobject});
    if(isUpdated.matchedCount > 0){
        return {"reviewId" : reviewId, "deleted": true}
    }
    else {
        throw `cannot delete review`
    }
}

module.exports = {
    getAllReviews,AddReview,getReviewbyID,deleteReview
}

