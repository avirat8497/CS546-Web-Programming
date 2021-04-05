const axios = require('axios');


async function checkNumber(id){
    if (typeof id!= 'number'){
        throw `${id || "provided variable"} is not a number`;
    }
}

async function checkUndefined(id){
    if(typeof id!= 'number'){
        throw `${id || "Value"} is not entered`;
    }
}

async function checkUndefinedStr(stateAbbrv){
    if(typeof stateAbbrv!= 'string'){
        throw `${stateAbbrv || "Value"} is not State`;
    }
}


async function getPersonbyId(id){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    await checkNumber(id);
    await checkNumber(id);

    if(id<0 || id>data.length){
        throw`${id || "provided variable"} is out of bound`;
    }

    else{
        for (let i in data){
            if(data[i].id == id){
                return data[i];
            }
        }
    }
        
}

async function howManyPerState(stateAbbrv){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    await checkUndefinedStr(stateAbbrv);
    let count = 0;
    for (const i of data){
        if(i.address.state === stateAbbrv){
            count +=1 ;
        }
    }
    if(count === 0){
        throw` There are no people in ${stateAbbrv}`
    }
    return count;
}



async function personByAge(index){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    await checkNumber(index);
    await checkUndefined(index);
    let objectAge = [];
    if(index<0 || index>data.length){
        throw`${index || "provided variable"} is out of bound`;
    }
    else{
        let date_today = new Date();
        for (i = 0;i<data.length;i++){
            let birthday = new Date(data[i].date_of_birth);
            let age = date_today.getFullYear() - birthday.getFullYear();
            let birth_month = date_today.getMonth() - birthday.getMonth();



        if (birth_month < 0 || (birth_month === 0 && date_today.getDate() < birthday.getDate())){
            age --;
        }
        objectAge.push({first_name : data[i].first_name, last_name : data[i].last_name, date_of_birth : data[i].date_of_birth, age : age})
        }


    sorted_list = objectAge.sort(function(a,b){
        date1 = new Date(a.date_of_birth);
        date2 = new Date(b.date_of_birth);
        return date2 - date1;
    })
    sorted_list = sorted_list.reverse();
    return sorted_list[index];
    }



}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function peopleMetrics(){
    var { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
    let vowels = ["a","e","i","o","u","A","E","I","O","U"];
    let city_count = {};
    let city_count_max = 0;
    result = {totalLetters : 0,
    totalVowels : 0,
    totalConsonants : 0,
    longestName : "",
    shortestName : "",
    mostRepeatingCity: "",
    averageAge: 0 , };


    for(const i of data){
     let first_Name = i.first_name;
     let last_Name = i.last_name;
     let full_Name = first_Name + last_Name
     full_Name = full_Name.toLowerCase();
     let birthday = i.date_of_birth;

     result.totalLetters += first_Name.length + last_Name.length;
     if(result.longestName.length < full_Name.length +1){
         result.longestName = first_Name + " " + last_Name;
     }
     if(result.shortestName.length > full_Name.length + 1){
        result.shortestName = first_Name + " " + last_Name;
    }
    city_count[i.address.state] = (city_count[i.address.state] || 0) + 1;
    if(city_count_max < city_count[i.address.state]) {
        cit_count_max = city_count[i.address.state];
        result.mostRepeatingCity = i.address.state;
    }
    result.averageAge +=getAge(birthday);
    result.averageAge = Math.round(result.averageAge / data.length);
    for (const j of full_Name){
        if(vowels.includes(j)){
            result.totalVowels ++;
        }
        else{
            result.totalConsonants ++;
        }
    }
   

    }

    return result;
}
module.exports = {
    getPersonbyId,
    howManyPerState,personByAge,peopleMetrics
}
