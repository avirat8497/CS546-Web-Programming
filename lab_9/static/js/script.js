function checkPrime(n){
    if (n === 2){
        return true;
    }
    for (i = 2;i<n;i++){
        if (n % i === 0){
            return false;
        }
    }
    return n>1;
}


let myForm = document.getElementById("myForm");
if (myForm){
    let indexInput = document.getElementById("index_to_search");
    let myOl = document.getElementById("results");
    let inputLabel = document.getElementById("inputLabel");
    let errorDiv = document.getElementById("error");

    myForm.addEventListener("submit",(event) => {
        event.preventDefault();
        if (indexInput.value && parseInt(indexInput.value) >=1){
            errorDiv.hidden = true;


            let num1 = 0;
            let num2 = 1;
            let sum = 0;
            for (i = 0;i<parseInt(indexInput.value,10) - 1;i++){
                sum = num1 + num2;
                num1 = num2;
                num2 = sum;
            }

        let prime = checkPrime(num2);
        let li = document.createElement("li");


        if(prime){
            li.className = "is-prime";
        }
        else{
            li.className = "not-prime";
        }
        li.innerHTML = "The Fibonacci of " + indexInput.value + "is " + num2 + ".";

        myOl.appendChild(li);
        myForm.reset();
        indexInput.focus();
        }

        else if (indexInput.value && parseInt(indexInput.value) < 1){
            let li = document.createElement('li');
            li.className = "not-prime";
            li.innerHTML = "The Fibonacci of " + indexInput.value + "is 0.";
            myOl.appendChild(li);
            myForm.reset();
            indexInput.focus();
        }
        else {
            errorDiv.hidden = false;
            errorDiv.innerHTML = "Enter a Valid number";
        }

    });
}
