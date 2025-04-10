let memory = 0;
let display = document.getElementById('display');

function addToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value += memory;
}

function addToMemory() {
    memory += Number(eval(display.value));
}

function subtractFromMemory() {
    memory -= Number(eval(display.value));
}

function sqrt() {
    display.value += 'Math.sqrt(';
}

function calculate() {
    try {
        let expression = display.value
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/\^/g, '**');
        
        let result = eval(expression);
        
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = Number(result.toFixed(8));
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9\.\+\-\*\/\(\)]/.test(key)) {
        addToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (/^[a-zA-Z]$/.test(key)) {
        // Handle scientific function typing
        const currentInput = display.value;
        if (key === 's' && currentInput.endsWith('sin')) {
            display.value = currentInput.slice(0, -3) + 'sin(';
        } else if (key === 'c' && currentInput.endsWith('cos')) {
            display.value = currentInput.slice(0, -3) + 'cos(';
        } else if (key === 't' && currentInput.endsWith('tan')) {
            display.value = currentInput.slice(0, -3) + 'tan(';
        } else {
            addToDisplay(key);
        }
    }
});