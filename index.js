let tmp = Array.from(document.querySelectorAll('.digit'));
let divits = {
    'secondTens': tmp[0],
    'secondOnes': tmp[1],
    'msHundreds': tmp[3],
    'msTens': tmp[4]
}

let numbers = {
    'secondTens': 0,
    'secondOnes': 0,
    'msHundreds': 0,
    'msTens': 0,

}

let timeoutFunctions = {
    'msTens': () => {
        divits.msTens.textContent = ++numbers.msTens;
    },

    'msHundreds': () => {
        divits.msHundreds.textContent = ++numbers.msHundreds;
        divits.msTens.textContent = numbers.msTens = 0;
    },

    'secondOnes': () => {
        divits.secondOnes.textContent = ++numbers.secondOnes;
        divits.msHundreds.textContent = numbers.msHundreds = 0;
    },
    'secondTens': () => {
        divits.secondTens.textContent = ++numbers.secondTens;
        divits.secondOnes.textContent = numbers.secondOnes = 0;
    },

}

let intervals = {
    // IDS of the timeout/intervals
    'msTens': null,
    'msHundreds': null,
    'secondOnes': null,
    'secondTens': null,

    stopAllTimers: function () {
        clearInterval(this.msTens);
        clearInterval(this.msHundreds);
        clearInterval(this.secondOnes);
        clearTimeout(this.secondTens);
    },
    startAllTimers: function () {
        intervals.msTens = setInterval(timeoutFunctions.msTens, 10);
        intervals.msHundreds = setInterval(timeoutFunctions.msHundreds, 100);
        intervals.secondOnes = setInterval(timeoutFunctions.secondOnes, 1000);
        intervals.secondTens = setTimeout(() => {
            timeoutFunctions.secondTens();
            intervals.stopAllTimers();

        }, 10000);
    },
    'reset': function () {
        numbers.secondTens = 0;
        numbers.secondOnes = 0;
        numbers.msHundreds = 0;
        numbers.msTens = 0;
        divits.secondTens.textContent = '-';
        divits.secondOnes.textContent = '-';
        divits.msHundreds.textContent = '-';
        divits.msTens.textContent = '-';
    }
}
intervals.stopAllTimers();

/* <div>
    <button id='start'>Start</button>
    <button id='reset'>Reset</button>
</div> */

const digits = document.querySelector('.digits');
let newDigits = digits;
digits.remove();

const startBtn = document.createElement('button');
startBtn.textContent = 'Start';
const resetBtn = document.createElement('button');
resetBtn.textContent = 'reset';
container.appendChild(startBtn);
container.appendChild(resetBtn);

const container = document.createElement('div');
container.appendChild(newDigits);
container.style.display = 'flex';
container.style.flexDirection = 'column ';
document.querySelector('body').appendChild(container);


startBtn.addEventListener('click', () => {
    intervals.reset();
    startBtn.disabled = true;
    setTimeout(() => startBtn.disabled = false, 10000)
    intervals.startAllTimers();

});
resetBtn.addEventListener('click', () => {
    intervals.stopAllTimers();
    intervals.reset();
    startBtn.disabled = false
})