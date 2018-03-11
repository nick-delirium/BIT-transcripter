const fs       = require('fs'),
      patterns = require('./functions/patterns.js');
      cases    = patterns.cases,
      bites    = patterns.bites;



/**
 * transform decimal number into binary
 * @param   {number} dec decimal number
 * @returns {number}     binary  number
 */
const dec2bin = (dec) =>{
    let bin = '';
    let num = (dec >>> 0).toString(2);
    for (let i = 0; i < num.length; i++) {
        num.charAt(i) == 0 ? (bin += 'ZERO') : (bin += 'ONE')
    }
    return bin;
}
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
const collection = {
    beautify: (block = './BIT_input.txt', patterns) => {
        block = fs.readFileSync(block, 'utf-8');
        let result  = '',
            l       = 1,
            started = block,
            start, end;
        
        while(block != '') {
            patterns.forEach((pattern, i, patterns) => {
                if (block.startsWith(pattern)) {
                    start = block.search(pattern);
                    end   = start+pattern.length;
    
                    if(pattern == 'LINE' && start == 0) {
                        result += '\n'+block.substring(start, end)+' ';
                    }
                    else result += block.substring(start, end)+' ';
    
                    block = block.substring(end, block.length);
                    l += 1;
                    console.log('\n'+'iteration '+l+result);
                }    
            })
        }
        let resulted = 'HERE LIES BEAUTIFUED CODE \n'+started+'\n\n\n'+'goes to \n\n'+result;
        fs.writeFileSync('./BIT_beautified.txt', resulted, 'utf-8');
        console.log('Beautified BIT code writed in BIT_beautified.txt')
    },
    printBIT: (entry, patterns) => {
        let letter, byte, linerNext, liner;
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
    },
    decipher: (code, patterns) => {
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
}

const main = (func, string) => {
    if      (func == 'beautify') { patternsIn = cases; }
    else if (func == 'printBIT') { patternsIn = bites; }
    else if (func == 'decipher') { patternsIn = ''}
    collection[func](string, patternsIn);
}


main(process.argv[2], process.argv[3]);