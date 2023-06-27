const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


//console.log(previousOperationText)
//console.log(currentOperationText)
//console.log(buttons)

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }


    //add digit to calculator screen
    //toda vez que eu recebo um evento de click no button esse método é chamado pelo objeto criado, esse método armazena 
    //o digito na variável currentOperation e chama o metodo updatescreen que adiciona o digito (botão apertado)
    //ao currentOperationText que no caso é valor que estamos atualmente digitando
    addDigit(digit){
        //não podemos aceitar mais do que um ponto por numero (1.1.1 ou ....1.... isso não pode ocorrer rsrs)
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }


    //process all calculator operations
    //usamos todos as operações em um mesmo metodo
    processOperation(operation){
        //check if current value is empty
        if(this.currentOperationText.innerText === "" && operation != "C"){
            //change operation ??
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }
        //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;            

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;

            case "DEL":
                this.processDelOperator();
            break;

            case "CE":
                this.processCEOperator();
            break;

            case "C":
                this.processClearOperator();
            break;

            case "=":
                this.processEqualOperator();
            break;


            default:
                return;
        }
    }

    //change values of the calculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //check if value is zero, if it is justt add current value
            if(previous === 0){
                operationValue = current;
            }

            //add current value to previous

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    //change math operation
    changeOperation(operation){
        const mathOperations = ["/","-","+","*"];
        if(!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //clear current operation
    processCEOperator(){
        this.currentOperationText.innerText = "";
    }

    processClearOperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    };

}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >= 0 || value === ".") {
                calc.addDigit(value);
        }else {
            calc.processOperation(value);
        }
    })
})