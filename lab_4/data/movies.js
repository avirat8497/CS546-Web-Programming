const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb').ObjectID;
const movies = mongoCollections.movies;

function checkCreate(title,plot,rating,runtime,genre,cast,info){
    if (typeof title !== 'string' || typeof plot !== 'string' ||
    typeof rating!== 'string'  || typeof runtime !== 'string' || typeof genre!== 'string' || 
    typeof cast !== 'string' || typeof info !== 'string' ){
        throw `Type of Paramter not correct`
    }

    if (title === 'undefined' || plot === 'undefined' ||
    rating=== 'undefined'  || runtime === 'undefined' || genre=== 'undefined' || 
    cast === 'undefined' || info === 'undefined'  || title === '' || plot === '' ||
    rating=== ''  || runtime === '' || genre=== '' ) {
        throw `Parameters are not correctly defined`
    }


    if (Array.isArray(cast) === false || cast.length < 1){
        throw `Cast Should be array of length more than 1` 
    } 

    for (let j = 0; j<cast.length ; j++){
        if (typeof cast[i] !== 'string' ||cast[i] === ''){
            throw` all elements of the cast are not array`
        }
    }

    if (typeof info.director == 'undefined' || typeof info.director != 'string'){
        throw `Director is not correct`
    }
    let date = new Date();
    if (typeof info.yearReleased !== 'number' || info.yearReleased < 1930 || info.yearReleased > date.getFullYear() + 5){
        throw `year of realease out of range`
    }


}

async function get(id){
    if(!id){
        throw `Invalid Id`
    }
    if (typeof id !== 'string'){
        throw `Id should be String`
    }
    const movieCollection = await movies();
    const movieo = await movieCollection.findOne({_id: ObjectId(id)});
     if (movieo === null ){
         throw `No Movie with that id`;
     }
     else {
         movieo._id = movieo._id.toString();
        return movieo;
     }
}


async function create(title,plot,rating,runtime,genre,cast,info){
    checkCreate(title,plot,rating,runtime,genre,cast,info);
    const movieCollection = await movies();
     let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        runtime: runtime,
        genre: genre,
        cast: cast,
        info: info,
    };

    const insertInfo = await movieCollection.insertOne(newMovie);
    if(insertInfo.insertedCount !== 0){
        return insertInfo.ops[0]
    }
    else{
        throw `Could Not create a new Movie`
    }


}
async function getAll(){
    const movieCollection = await movies();
    const movieo = await movieCollection.find({}).toArray();
    return movieo;
}

async function remove(id){
    if(!id) {throw `you must provide an id to search for`}
    if (typeof id !== 'string'){
        throw `Id should be String`
    }
    const movieCollection = await movies();
    const movielo = await movieCollection.findOne({_id: id});
    const movieo = await movieCollection.removeOne({_id: ObjectId(id)})

    if (movieo.deletedCount === 0){
        throw  `Could not delete movie with id of ${id}`
    }
    return (movieo.title + "has been successfully deleted");

}
async function rename(id, newTitle){

    if (!id){ 
    throw `You must provide an id to search for`;
}
if (typeof id !== 'string'){
    throw `Id should be String`
}
if (!newTitle){
    throw `You must provide a new movie title`;
}
//ObjectId = require('mongodb').ObjectId;

const movieCollection = await movies();
const updatemovie = {
    title: newTitle,
}

const updatedInfo = await movieCollection.updateOne({_id:ObjectId(id)},{$set: updatemovie});
if(updatedInfo.modifiedCount === 0){
    throw `Could not update movie name succesfully`;
}
else{
    return await this.get(id);
}

}

module.exports = {
    get,create,getAll,remove,rename
}

