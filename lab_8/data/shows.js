const axios = require("axios");

async function shows(){
    const data = await axios.get('http://api.tvmaze.com/shows');
    console.log(data)
    return data.data;
}

async function getshowsid(id){
 
try {
    id = Number(id)
 if (id < 1)
    {
     throw `Invalid ID`
}
    const data = await axios.get("http://api.tvmaze.com/shows/" + id);
    return data.data;
 }  
 catch(e) {
     return 'Invalid ID';
 } 
}

async function getshowsbyterm(searchTerm){
 try{ 
     const data = await axios.get("http://api.tvmaze.com/search/shows?q=" + searchTerm);
     console.log(searchTerm);
     return data.data; 
}
     catch(e) {
         return 'Invalid ID';
     } 
}
module.exports = {
    shows,getshowsid,getshowsbyterm
};