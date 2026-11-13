const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const checkButton = document.getElementById("check");
const result = document.getElementById("result");

checkButton.addEventListener("click",  function() {
    let num1Value = parseInt(num1.value);
    let num2Value = parseInt(num2.value);
    let fibonacci = [num1Value, num2Value];

    for (let i = 2; i < 12; i++) {
        fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
    }

    let nothing = "";

    for (let i = 0; i < fibonacci.length; i++) {
       nothing += fibonacci[i] + ",";
    }
     nothing[0] = "";
     nothing[nothing.length - 1] = "";
    result.value = nothing;
    console.log(fibonacci);

});