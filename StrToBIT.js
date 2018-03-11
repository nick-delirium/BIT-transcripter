const fs       = require('fs'),
      patterns = require('./patterns.js');
      cases    = patterns.cases,
      bites    = patterns.bites;


const dec2bin = (dec) =>{
    let bin = '';
    let num = (dec >>> 0).toString(2);
    for (let i = 0; i < num.length; i++) {
        num.charAt(i) == 0 ? (bin += 'ZERO') : (bin += 'ONE')
    }
    return bin;
}

const printBIT = (entry, patterns) => {
    let letter, byte, linerNext, liner, breaker;
    let asciiBytes = [];
    let result     = '';

    entry = entry.toLowerCase();

    for (let i = 0; i < entry.length; i++) {
        letter = entry.charAt(i);
        console.log('char "'+letter+'":');

        if (patterns[letter] != undefined) {
            bytes = patterns[letter];
            console.log(bytes);

            for (let l = 0; l < bytes.length; l++) {
                byte = bytes.charAt(l);
                byte == 0 ? (asciiBytes.push('ZERO')) : (asciiBytes.push('ONE'));
            }
        }
    }
    console.log(entry+' -> '+asciiBytes.join(' '));
    asciiBytes.forEach((asciiByte, i, asciiBytes) => {
        liner     = dec2bin(i);
        linerNext = dec2bin(i+1);
        result += 'LINENUMBER'+liner+'CODEPRINT'+asciiByte+'GOTO'+linerNext;
    })
    fs.writeFileSync('./BIT_input.txt', result, 'utf-8')
    console.log('Writed in BIT_input.txt')
}

printBIT(process.argv[2], bites);