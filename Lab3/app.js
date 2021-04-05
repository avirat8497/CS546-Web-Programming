const people = require("./people");
const work = require("./work");

async function main(){
/* try{
        const peopledata = await people.getPersonbyId(1);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

 try{
        const peopledata = await people.howManyPerState('NY');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

 try{
        const peopledata = await people.personByAge(-1);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

try{
        const peopledata = await people.peopleMetrics();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
  
*/
 try{
    const workdata = await work.fourOneOne("240-144-7553");
    console.log (workdata);
}catch(e){
    console.log (e);
}

try{
    const workdata = await work.listEmployees();
    console.log (workdata);
}catch(e){
    console.log (e);
}
try{
    const workdata = await work.whereDoTheyWork('299-63-8866');
    console.log (workdata);
}catch(e){
    console.log (e);
}


}
main();