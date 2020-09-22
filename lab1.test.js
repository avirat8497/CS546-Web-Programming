const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should output {'1': false, '2': true, '3': true}
console.log(lab1.questionOne([2])); 
// {'2': true} 

console.log(lab1.questionOne([5, 10, 9])); 
// {'5': true, '10': false, '9': false}

console.log(lab1.questionOne([2, 7, 9, 1013])); 
// {'2': true, '7': true, '9': false, '1013': true}

console.log(lab1.questionOne([])); 
// {}



// QUESTION TWO TEST CASES
console.log(lab1.questionTwo([1,2,3])); 
//2744
console.log(lab1.questionTwo([2])); 
// 64 

console.log(lab1.questionTwo([5, 10, 9])); 
// 8741816

console.log(lab1.questionTwo([2, 7, 9, 10])); 
// 12812904

console.log(lab1.questionTwo([])); 
// 0


console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// should output {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("How now brown cow!!!"));
// {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}


console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
// {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}


console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("")); 
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}


console.log(lab1.questionFour(25000, 3.11, 5)); 
// should output: 450.44


console.log(lab1.questionFour(30000, 5, 6)); 
//483.15

console.log(lab1.questionFour(19500, 7, 3)); 
//602.10

console.log(lab1.questionFour(55000, 2, 6)); 
//811.27

console.log(lab1.questionFour(33000, 4.5, 2)); 
//1440.38