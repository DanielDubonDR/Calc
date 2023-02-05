const changeColor = document.querySelector(".changeColor");
const area = document.querySelector('.input_area');
const buttons = document.querySelectorAll('.calculator_button');
const rightBtns = document.querySelectorAll('.calculator_btn_right');
const topBtns = document.querySelectorAll('.calculator_btn_top');
const calculator = document.querySelector('.calculator');
const values = document.querySelector('#values');
const result = document.querySelector('#result');

let lightMode = false;

changeColor.addEventListener('click', () => {
    changeColor.classList.toggle('change_color--light');
    area.classList.toggle('calculator_input-area--light');
    calculator.classList.toggle('calculator--light');

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('calculator_button--light');
    }

    for(let i = 0; i < rightBtns.length; i++) {
        rightBtns[i].classList.toggle('calculator_button-right--light');
    }

    for(let i = 0; i < topBtns.length; i++) {
        topBtns[i].classList.toggle('calculator_button-top--light');
    }

    values.classList.toggle('calculator_values--light');
    result.classList.toggle('calculator_result--light');
    lightMode = !lightMode;
});

// * -------------------------- CALCULATOR LOGIC

const display = document.querySelector('#result');
const ac = document.querySelector('#AC');

const zero = document.querySelector('#zero');
const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');

const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const multiply = document.querySelector('#mul');
const div = document.querySelector('#div');
const equal = document.querySelector('#equal');
const del = document.querySelector('#delete');
const dot = document.querySelector('#dot');
const percent = document.querySelector('#percent');
const sign = document.querySelector('#sign');

const numbers = [zero, one, two, three, four, five, six, seven, eight, nine];


//        cuurent, operator, acumulator
let operation = ["0", "0", "0"];
let waitingForSecondNumber = false;
let equalPressed = false;

ac.addEventListener('click', () => {
    ac.innerHTML = 'AC';
    values.innerHTML = "";
    display.innerHTML = '0';
    operation[0] = '0';
    operation[1] = '0';
    operation[2] = '0';
    rightBtns.forEach((btn) => {
        btn.classList.remove('keyPressedLight')
        btn.classList.remove('keyPressedDark')
    });
});

const numberHandler = (n) => {
    if (waitingForSecondNumber) {
        display.innerHTML = '0';
        waitingForSecondNumber = false;
    }
    if (equalPressed) {
        display.innerHTML = '0';
        equalPressed = false;
    }
    rightBtns.forEach((btn) => {
        btn.classList.remove('keyPressedLight')
        btn.classList.remove('keyPressedDark')
    });
    ac.innerHTML = 'C';
    const currenDisplay = display.innerHTML;
    let newDisplay = `${currenDisplay}${n}`;
    if (currenDisplay === '0') {
        newDisplay = n;
    }
    display.innerHTML = `${(newDisplay)}`;
    values.innerHTML = `${values.innerHTML}${n}`;
};

numbers.forEach((n, i) => n.addEventListener('click', () => numberHandler(i)));

del.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    let newDisplay = currentDisplay.slice(0, -1);
    display.innerHTML = newDisplay;
});

percent.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    let newDisplay = currentDisplay / 100;
    display.innerHTML = newDisplay;
});

dot.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    if (currentDisplay.includes('.')) {
        return;
    }
    display.innerHTML = `${currentDisplay}.`;
});

sign.addEventListener('click', () => {
    const currentDisplay = display.innerHTML;
    let newDisplay = currentDisplay * -1;
    if(currentDisplay === '0') 
    {
        newDisplay = '-0';
    }
    display.innerHTML = newDisplay;
});

const operators = [
    {
        el: div,
        operator: '/',
    },
    {
        el: multiply,
        operator: '*',
    },
    {
        el: minus,
        operator: '-',
    },
    {
        el: plus,
        operator: '+',
    }
];


const operatorHandler = (operator) => {
    const currentDisplay = display.innerHTML;
    operation[0] = currentDisplay;
    operatorAux = operation[1];
    operation[1] = operator;
    if (operation[2] === "0") {
        operation[2] = Number(currentDisplay);
        values.innerHTML = `${currentDisplay}${operation[1]}`;
    }
    else if (operatorAux != operation[1]) {
        let aux = `${operation[2]}${operatorAux}${operation[0]}`;
        operation[2] = eval(aux);
        values.innerHTML = `${operation[2]}${operation[1]}`;
    }
    else
    {
        let aux = `${operation[2]}${operation[1]}${operation[0]}`;
        operation[2] = eval(aux);
        values.innerHTML = `${values.innerHTML}${operation[1]}`;
    }
    let resultTxt = operation[2].toString();
    if (resultTxt.includes('.')) 
    {
        operation[2] = operation[2].toPrecision(8);
    }
    waitingForSecondNumber = true;
    display.innerHTML = Number(operation[2]);
};

operators.forEach((o) => o.el.addEventListener('click', () => {
    operatorHandler(o.operator);
    if (lightMode) {
        o.el.classList.add('keyPressedLight');
    }
    else 
    {
        o.el.classList.add('keyPressedDark');
    }
}));

equal.addEventListener('click', () => {
    const currenDisplay = display.innerHTML;
    equalPressed = true;
    let newDisplay = `${operation[2]}${operation[1]}${currenDisplay}`;
    let res = eval(newDisplay);
    let resultTxt = res.toString();
    if (resultTxt.includes('.')) 
    {
        res = res.toPrecision(8);
    }
    display.innerHTML = Number(res);
    operation[2] = '0';
    values.innerHTML = "";
});