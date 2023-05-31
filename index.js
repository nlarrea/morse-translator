const textInput = document.querySelector('#text-to-translate');
const textOutput = document.querySelector('#translated-text');

const clearBtn = document.querySelector('#btn-clear');

const morseDictionary = {
    // numbers
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
    5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
    // letters
    a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.',
    f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
    k: '-.-', l: '.-..', m: '--', n: '-.', ñ: '--.--',
    o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...',
    t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
    y: '-.--', z: '--..',
    // symbols
    '&': '.-...', '\'': '.----.', '@': '.--.-.', ')': '-.--.-',
    '(': '-.--.', ':': '---...', ',': '--..--', '=': '-...-',
    '!': '-.-.--', '.': '.-.-.-', '-': '-....-', '*': '-..-',
    '%': '----- -..-. -----', '+': '.-.-.', '"': '.-..-.',
    '?': '..--..', '/': '-..-.', ' ': '/'
};


clearBtn.addEventListener('click', evt => {
    textInput.value = '';
    textOutput.value = '';
});


textInput.addEventListener('keyup', evt => {
    const isMorse = checkIsMorse(textInput.value);

    let message;
    if (isMorse) {
        message = morseToText(textInput.value);
    } else {
        message = textToMorse(textInput.value);
    }

    if (textInput.value) textOutput.value = message;
    else textOutput.value = '';
});


/**
 * Function that checks if a given text is Morse or not.
 * @param {string} text 
 * @returns {boolean}
 */
function checkIsMorse(text) {
    const morseSymbols = ['.', '-', '/', ' '];
    
    for (let char of text) {
        if (!morseSymbols.includes(char)) {
            return false
        }
    }

    return true;
}


function morseToText(message) {
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    }

    const msgList = message.split(' ');
    const translatedList = msgList.map(char => getKeyByValue(morseDictionary, char));

    return translatedList.join('');
}


function textToMorse(message) {
    const msgList = message.toLowerCase().split('');
    const translatedList = msgList.map(char => morseDictionary[char] + ' ');
    
    return translatedList.join('');
}