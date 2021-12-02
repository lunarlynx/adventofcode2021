'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const measureBuffer = String(buffer).split('\n').map(Number);

function measureDrops(array) {

    let counter = 0;
    let sumArray = [];

    for (let i = 0; i < array.length - 3; i++) {
        let a = array[i] + array[i + 1] + array[i + 2];
        sumArray.push(a);
    }

    for (let j = 0; j < sumArray.length; j++) {
        if (sumArray[j + 1] > sumArray[j]) {
            counter++;
        }
    }

    return counter;
}

console.log(measureDrops(measureBuffer));
