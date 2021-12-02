'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const measureBuffer = String(buffer).split('\n').map(Number);

function measureDrops(array) {

    let counter = 0;

    for (let i=0; i < array.length-1; i++) {
        if (array[i+1] > array[i]) {
            counter++;
        }
    }

    return counter;
}

console.log(measureDrops(measureBuffer));
