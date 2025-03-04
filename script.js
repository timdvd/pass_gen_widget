const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied ti clipboard');
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    //console.log(hasLower, hasUpper, hasNumber, hasSymbol);
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
});

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number +symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    if(typesCount === 0){
        return '';
    }
    for(let i = 0; i < length; i+=typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword;
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
console.log(getRandomLower());

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
console.log(getRandomUpper())

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
console.log(getRandomNumber())

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}