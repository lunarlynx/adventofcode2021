'use strict';

const fs = require('fs');

let buffer = fs.readFileSync('input.txt');

let measureBuffer = String(buffer).split('\n').map(Number);

function measureDrops(array) {

    let counter = 0;

    for (let i=0; i < array.length; i++) {
        if (array[i+1] > array[i]) {
            counter++;
        }
    }

    return counter;
}

console.log(measureDrops(measureBuffer));
