const fs       = require('fs'),
      patterns = require('./patterns.js');
      cases    = patterns.cases,
      bites    = patterns.bites;


/**
 * beautifyes BIT code block by adding spaces and breakes into it
 * @param   {string} block block of BIT code 
 * @param   {array} patterns collection of BIT commands
 * @returns {string} readable code
 * result     - result of a function
 * l          - counter for iterations
 * started    - initial code line
 * start, end - position to cut block of code
 */
const normalize = (block = './BIT_input.txt', patterns) => {
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
}

normalize(process.argv[2], cases);