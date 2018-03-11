const fs       = require('fs'),
      patterns = require('./patterns.js'),
      bites    = patterns.bites;

const swap = (obj) => {
    let reversed = {};
    for (let key in obj) {
        reversed[obj[key]] = key;
    }
    return reversed;
}

const decrypt = (string) => {
    biteCollection = swap(bites);
    letter = biteCollection[string];

    return letter;
}

const decompile = (code, patterns) => {
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