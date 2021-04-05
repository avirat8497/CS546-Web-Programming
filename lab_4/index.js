const movies = require("./data/movies");
const connection = require('./config/mongoConnection');
const { ObjectID } = require("mongodb");

const main = async() => {
    let movie1 = {}
    let movie2 = {}

    try{
        movie1 = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
        //movie1._id = movie1._id.toString();
        console.log(movie1);
    }catch(e){
        console.log(e);
    }

    try{
        movie2 = await movies.create("The Dark Knight","With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.","PG-13", "2hr 32min","Action",["Christian Bale","Heath Ledger"],{director: "Christopher Nolan", yearReleased: 2008});
        //console.log(movie2._id.toString());
        console.log(movie2);
    }catch(e){
        console.log(e);
    }

    const allmovies = await movies.getAll();
    console.log(allmovies);
    console.log(allmovies.length);

    try{
         movie3 = await movies.create("The Shawshank Redemption","Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.","R", "2hr 22min","Drama",["Morgan Freeman","Tim Robbins"],{director: "Frank Darabont", yearReleased: 1994});
        //movie3._id = movie3._id.toString();
        console.log(movie3);
        //console.log(movie3['_id']);
    }catch(e){
        console.log(e);
    }

    try{
        
        const update = await movies.rename(movie1._id,"Bill Ted Face the Music");
        console.log(update);
    }catch(e){
        console.log(e);
    }
    try{
        const update = await movies.remove(movie2._id);
        console.log(update);
    }catch(e){
        console.log(e);
    }

    const allmovies1 = await movies.getAll();
    console.log(allmovies1);
    
    try{
        movie4 = await movies.create("The Shawshank Redemption","Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.","R", "2hr 22min","Drama",["Morgan Freeman","Tim Robbins"],{director: "", yearReleased: 129});
       //movie3._id = movie3._id.toString();
       console.log(movie4);
       //console.log(movie3['_id']);
   }catch(e){
       console.log(e);
   }

   try{
    movie = await movies.remove('5f7d2978dbf75e2133ca3866');
   //movie3._id = movie3._id.toString();
   console.log(movie);
   //console.log(movie3['_id']);
}catch(e){
   console.log(e);
}

try{
    movie6 = await movies.rename("5f7d2978dbf75e2133ca3866","");
   //movie3._id = movie3._id.toString();
   console.log(movie6);
   //console.log(movie3['_id']);
}catch(e){
   console.log(e);
}

try{
    movie6 = await movies.rename("5f7d2978dbf75e2133ca3866","the mummy");
   //movie3._id = movie3._id.toString();
   console.log(movie6);
   //console.log(movie3['_id']);
}catch(e){
   console.log(e);
}

try{
    movie6 = await movies.get("5f7d2978dbf75e2133ca3866");
   //movie3._id = movie3._id.toString();
   console.log(movie6);
   //console.log(movie3['_id']);
}catch(e){
   console.log(e);
}

const db = await connection();
await db.serverConfig.close()

};
main();