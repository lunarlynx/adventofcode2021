'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const dataArray = String(buffer).trim().split('\n').map(el => el.split(''));

function arrayColumn(arr, n) {
    return arr.map(x => x[n]);
}

function parsingData(array) {
    let y = [];
    let e = [];
    let count0 = 0;
    let count1 = 0;

    for (let i = 0; i < array[i].length; i++) {

        let columnData = arrayColumn(array, i);

        for (let j = 0; j < columnData.length - 1; j++) {
            if (columnData[j] === '0') {
                count0++;
            } else {
                count1++;
            }
        }
        if (count0 > count1) {
            y.push('0');
            e.push('1');
        } else {
            y.push('1');
            e.push('0');
        }

        count0 = 0;
        count1 = 0;
    }

    console.log(y, e);
    return [y, e];
}

function powerConsumption(bits) {
    let decimalY = parseInt(bits[0].reduce((a, b) => {return a + b}), 2);
    let decimalE = parseInt(bits[1].reduce((a, b) => {return a + b}), 2);
    return decimalY * decimalE;
}

let bitData = parsingData(dataArray);

console.log(powerConsumption(bitData));
