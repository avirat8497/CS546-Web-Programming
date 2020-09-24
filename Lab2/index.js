const arrayUtils = require('./arrayUtils');
const objUtils = require('./objUtils');
const stringUtils = require('./stringUtils');


const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
// Mean 
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }
// Median Squared
 try {
    // Should Pass
    const medianOne = arrayUtils.medianSquared([2, 3, 4]);
    console.log('median passed successfully');
 } catch (e) {
    console.error('median failed test case');
 }
 try {
    // Should Fail
    const medianTwo = arrayUtils.medianSquared(1234);
    console.error('median did not error');
 } catch (e) {
    console.log('median failed successfully');
 }
 
 // Max Element
 try {
    // Should Pass
    const maxeleOne = arrayUtils.maxElement([1,2,3]);
    console.log('max element passed successfully');
 } catch (e) {
    console.error('max element failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = arrayUtils.maxElement();
    console.error('max element did not error');
 } catch (e) {
    console.log('max element failed successfully');
 }


 // fill 

 try {
    // Should Pass
    const fillOne = arrayUtils.fill(6);
    console.log('fill passed successfully');
 } catch (e) {
    console.error('fill failed test case');
 }
 try {
    // Should Fail
    const fillTwo = arrayUtils.fill();
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully');
 }

 // count Repeating

 try {
    // Should Pass
    const maxeleOne = arrayUtils.countRepeating([1,2,3]);
    console.log('count repeating passed successfully');
 } catch (e) {
    console.error('count repeating failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = arrayUtils.countRepeating();
    console.error('count repeating did not error');
 } catch (e) {
    console.log('count repeating failed successfully');
 }
// is equal 
 try {
    // Should Pass
    const maxeleOne = arrayUtils.isEqual([1, 2, 3], [3, 1, 2]);
    console.log('is equal passed successfully');
 } catch (e) {
    console.error('is equal failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = arrayUtils.isEqual([1, 2, 3], [4, 5, 6]);
    console.error('is equal did not error');
 } catch (e) {
    console.log('is equal failed successfully');
 }

 // camel case 

 try {
    // Should Pass
    const maxeleOne = stringUtils.camelCase('FOO BAR');
    console.log('camel case passed successfully');
 } catch (e) {
    console.error('camel case failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = stringUtils.camelCase();
    console.error('camel case did not error');
 } catch (e) {
    console.log('camel case failed successfully');
 }

 // replace char 

 try {
    // Should Pass
    const maxeleOne = stringUtils.replaceChar('daddy');
    console.log('replace char passed successfully');
 } catch (e) {
    console.error('replace char failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = stringUtils.replaceChar("");
    console.error('replace char did not error');
 } catch (e) {
    console.log('replace char failed successfully');
 }

// mash up 

try {
    // Should Pass
    const maxeleOne = stringUtils.mashUp("hello", "world");
    console.log('mash up passed successfully');
 } catch (e) {
    console.error('mash up failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = stringUtils.mashUp();
    console.error('mash up did not error');
 } catch (e) {
    console.log('mash up failed successfully');
 }


// make arrays
 try {
    // Should Pass
    const maxeleOne = objUtils.makeArrays([first, second, third]);
    console.log('make arrays passed successfully');
 } catch (e) {
    console.error('make arrays failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = objUtils.makeArrays()
    console.error('make arrays did not error');
 } catch (e) {
    console.log('make arrays failed successfully');
 }


 // is deep equal

const first1 = {a: 2, b: 3};
const second2= {a: 2, b: 4};
const third3 = {a: 2, b: 3};
const forth4 = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth5  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
 try {
    // Should Pass
    const maxeleOne = objUtils.isDeepEqual([first1, second2]);
    console.log('is deep equal passed successfully');
 } catch (e) {
    console.error('is deep equal failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = objUtils.isDeepEqual();
    console.error('is deep equal did not error');
 } catch (e) {
    console.log('is deep equal failed successfully');
 }


 // compute object 

 try {
    // Should Pass
    const maxeleOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('compute object passed successfully');
 } catch (e) {
    console.error('compute object failed test case');
 }
 try {
    // Should Fail
    const maxeleTwo = objUtils.computeObject();
    console.error('compute object did not error');
 } catch (e) {
    console.log('compute object failed successfully');
 }






