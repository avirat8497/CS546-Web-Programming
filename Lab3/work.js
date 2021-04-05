const axios = require('axios');

function checkNum(string){
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneno.test(string)){
        throw`${string} not in proper ###-###-#### format`
    }
}
function checkSSN(string){
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/;
    if (!phoneno.test(string)){
        throw`${string} not in proper ###-##-#### format`
    }
}
function checkString(string){
    if(typeof string!= 'string'){
        throw `${string || "string"} is not valid number`;
    }
}
function checkLengthPhone(string){
    if(string.length !== 12){
        throw`Phone Number not Valid`;
    }
}
function checkLengthSSN(string){
    if(string.length !== 11){
        throw`Phone Number not Valid`;
    }
}

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    return data;
}

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');   
    return data;
}


async function listEmployees(){
    const data = await getWork();
    const people_data = await getPeople();
    let result = [];
    for (const i of Object.keys(data)){
        let employeelist = [];
        for (const id of data[i].employees){
            for(const p of Object.keys(people_data)){
                if(people_data[p].id === data[i].id){
                    employeelist.push({
                        first_name: people_data[p].first_name,
                        last_name: people_data[p].last_name,
                    });
                    break;
                }
            }
        }

        result.push({
            company_name:data[i].company_name,
            employees: employeelist,
        });
    }
return result;


}

async function fourOneOne(phonenumber){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    checkNum(phonenumber);
    checkString(phonenumber);
    checkLengthPhone(phonenumber);
    for(const i of Object.keys(data)){
        //console.log(phonenumber);
        if (data[i].company_phone === phonenumber){
            return {
                company_name: data[i].company_name,
                company_address: data[i].company_address,
            };
        }
        
    }

        throw`Phone number doesnot exists`;

}
async function whereDoTheyWork(ssn){
    checkString(ssn);
    checkSSN(ssn);
    checkLengthSSN(ssn);
    //const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    //const { people_data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');   
    const data = await getWork();
    const people_data = await getPeople();
    //console.log(people_data);
    for (const i of Object.keys(people_data)){
        //console.log(people_data[i].ssn);
        if(people_data[i].ssn === ssn){
            
            for(const work_i of Object.keys(data)){
                    if (people_data[i].id === data[work_i].id){
                        console.log('helooo');
                        return `${people_data[i].first_name} ${people_data[i].last_name} works at ${data[work_i].company_name}.`;
                    }

            }
        }
    
    }

    throw`SSN not valid`;
}




module.exports = {
    fourOneOne,listEmployees,whereDoTheyWork,
}
