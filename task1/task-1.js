'use strict';

const fs = require('fs');

let buffer = fs.readFileSync('input.txt');

let measureBuffer = String(buffer).split('\n').map(Number);

function measureDrops(array) {

    let counter = 0;

    for (let i=0; i < measureBuffer.length; i++) {
        if (measureBuffer[i+1] > measureBuffer[i]) {
            counter++;
        }
    }

    return counter;
}

console.log(measureDrops(measureBuffer));
