const fs       = require('fs'),
      patterns = require('./patterns.js'),
      bites    = patterns.bites;


/**
 * Reverse keys and values in object
 * @param   {Array} obj json object
 * @returns {Array} reversed object
 */
const swap = (obj) => {
    let reversed = {};
    for (let key in obj) {
        reversed[obj[key]] = key;
    }
    return reversed;
}

/**
 * Searches in bites for given ASCII bytes collection
 * @param   {stirng} string ASCII bytes collection
 * @returns {string}      decrypted from ASCII bytes to ASCII symbols string
 */
const decrypt = (string) => {
    biteCollection = swap(bites);
    letter = biteCollection[string];

    return letter;
}

/**
 * Decompiles BIT code to get a string from it
 * @param   {string} code BIT-code block
 * @returns {string}      writes in file 'BIT_decompiled.txt' string from BIT code block
 */
const decompile = (code) => {
    let bytes    = [],
        flag     = true,
        chunk    = '',
        word     = '',
        i        = 0,
        iterator = 0;
        code     = fs.readFileSync(code, 'utf-8');

        while(flag){
            console.log('iteration #'+iterator);
            let startPos = code.search('PRINT')+5,
                endPos   = code.search('GOTO'),
                delEnd   = endPos+4,
                tested   = code.substring(startPos, endPos);

            if(tested.search('ONE') != -1 || tested.search('ZERO') != -1) {
                tested == 'ZERO' ? (tested = 0) : (tested = 1);
                chunk += tested;
                console.log('string: '+chunk);
                if (chunk.length == 8) {
                    bytes.push(chunk);
                    chunk = '';
                }
            } else flag = false;
            code = code.substring(delEnd);
            console.log(bytes);
            iterator += 1;
        }
    for (let i in bytes) {
        word += decrypt(bytes[i]);
    }
    console.log(word)
    fs.writeFileSync('./BIT_decompiled.txt', word, 'utf-8')
}

decompile(process.argv[2])