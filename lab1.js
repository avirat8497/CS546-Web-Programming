
const questionOne = function questionOne(arr) {
    let primenumbersObj = {};
    arr.forEach(number => {
        if (number == 1){
            primenumbersObj[number] = false;
        }
        else if (number ==2) {
            primenumbersObj[number] = true;
        }
        else if (number > 2){
            for (var i = 2; i < number ;i++){
                if (number % i === 0){
                    primenumbersObj[number] = false;
                    break;
                }
                else{
                    primenumbersObj[number] = true;
            }               
         } 
        }           
    });
    return primenumbersObj;
}

const questionTwo = function questionTwo(arr) { 
    let sum = 0
    arr.forEach(value => {
        sum = sum + value ** 2
        });
    sum  = sum ** 6;
    sum = Math.sqrt(sum);
    return sum;

}

const questionThree = function questionThree(text) {
    
    
    let n = text.length;
    let answerObj = {
    vowels : 0,
    consonants : 0,
    digits : 0,
    spaces : 0,
    punctuation : 0,
    specialchar : 0
};                                                                                                                                                           
    for (let i = 0;i<n;i++){
        
        let ch = text.charAt(i);
        ch = ch.toLowerCase();
        if ((ch >= 'a' && ch<='z')){

            if (ch == 'a' || ch == 'e' || ch == 'i' || 
            ch == 'o' || ch == 'u') {
            answerObj.vowels++;
            }
            else {
                answerObj.consonants++
            }
        }
        else if(ch == ' '){
            answerObj.spaces++;
        }

        else if((ch >= '0' && ch <= '9') ){
            answerObj.digits++;

        }
        else if(ch == '!' || ch == ',' || ch == ';' || ch == '.' || ch == '?' ||   
        ch == '-' || ch == '\'' || ch == '\"' || ch == ':'){
            answerObj.punctuation++;

        }
        else{
            answerObj.specialchar++;
        }
        
    }
    return answerObj;


    
    
}


const questionFour = function questionFour(num1, num2,num3) {
    let principal = num1;
    let interest = num2/100/12;
    let months = num3 * 12;
    let x = Math.pow(1 + interest,months);
    let loan = (principal * x * interest) / (x-1);
    //let l = loan.toFixed(2)
    return loan;
    //return console.log(`Loan Amount: ${principal}, interest rate: ${num2}% (${num2/100}), term: ${num3} years (${num3} * 12 = ${months} monthly payments), Monthly Payment: ${loan})`);

}

module.exports = {
    firstName: "AVIRAT", 
    lastName: "BELEKAR", 
    studentId: "10454332",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};