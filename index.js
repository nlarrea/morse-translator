const textInput = document.querySelector('#text-to-translate');
const textOutput = document.querySelector('#translated-text');

const clearBtn = document.querySelector('#btn-clear');
const copyBtn = document.querySelector('#btn-copy');

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
    '?': '..--..', '/': '-..-.', ' ': '/', '\n': '\n'
};


clearBtn.addEventListener('click', evt => {
    textInput.value = '';
    textOutput.value = '';

    clearBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    
    setTimeout(() => {
        clearBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    }, 2000);
});

copyBtn.addEventListener('click', evt => {
    navigator.clipboard.writeText(textOutput.value);

    copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

    setTimeout(() => {
        copyBtn.innerHTML = `<i class="fa-solid fa-clone"></i>`;
    }, 2000);
})


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
    const morseSymbols = ['.', '-', '/', ' ', '\n'];
    
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

    const msgList = message.replace(/\n/g, ' \n ').split(' ');
    const translatedList = msgList.map(char => getKeyByValue(morseDictionary, char));

    return translatedList.join('');
}


function textToMorse(message) {
    const msgList = message.toLowerCase().split('');
    const translatedList = msgList.map(char => {
        if (morseDictionary[char]) {
            return morseDictionary[char] + ((char === '\n')? '' : ' ');
        } else {
            return char;
        }
    });
    
    return translatedList.join('');
}