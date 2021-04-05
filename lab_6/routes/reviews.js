const express = require('express');
const router = express.Router();
const reviwesData = require('../data/reviews');
const booksData = require('../data/books');
const { reviews } = require('../config/mongoCollections');


router.get('/:BookId',async (req,res) => {
    try{
        const book = await booksData.getBookByID(req.params.BookId);
        allReviewsIds = book.reviews;
        if (allReviewsIds.length === 0){
            throw`NO review for book available`
        }
    }catch(e){
        res.status(404).send({message: e});
        return;
    }
    try{
       allReviews = await reviewsData.getAllReviews(allReviewsIds);
       res.json(allReviews)
    }catch(e){
        res.status(500).send({message: e});
    }

});

router.post('/BookId',async (req,res) => {
try{
    data = req.body;
    bookBeingReviewed = req.params.BookId;
    const returnedReview = await reviewsData.AddReview(data.title,data.reviewer,bookBeingReviewed,data.rating,data.dateOfReview,data.review);
    res.json(returnedReview);
}catch(e){
   console.log(e);
   res.status(400).send({message: e});
}
});

router.get('/:bookId/:reviewId',async (req,res) => {
    try{
        bookId = req.params.bookId;
        reviewId = req.params.reviewId;
        const data = await reviewsData.getReviewByID(bookId,reviewId)
        res.json(data);
    }catch(e){
       console.log(e);
       res.status(404).send({message: e});
    }
    });
router.get('/:bookId/:reviewId',async (req,res) => {
    try{
        bookId = req.params.bookId;
        reviewId = req.params.reviewId;
        const data = await reviewsData.deleteReview(bookId,reviewId)
        res.json(data);
    }catch(e){
       console.log(e);
       res.status(500).send({message: e});
    }
    });

module.exports = router;