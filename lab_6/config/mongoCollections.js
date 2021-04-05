const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
    let _col = undefined 
    return async () => {
        if(!col){
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col
    };
};

module.exports = {
    books: getCollectionFn('books'),
    reviews: getCollectionFn('reviews')
};