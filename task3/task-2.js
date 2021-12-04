'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const dataArray = String(buffer).trim().split('\n').map(el => el.split(''));

function arrayColumn(arr, n) {
    return arr.map(x => x[n]);
}

// если n=1, то ищем кислород
// если n=0, то ищем углекислый газ
function parsingGas(array, n) {
    let gasMarker = [];

    let arrayLength = array[0].length;
    for (let i = 0; i < arrayLength; i++) {
        if (array.length === 1) {
            break;
        }

        let count0 = 0;
        let count1 = 0;
        let array0 = [];
        let array1 = [];

        let columnData = arrayColumn(array, i);

        for (let j = 0; j < columnData.length; j++) {
            if (columnData[j] === '0') {
                count0++;
                array0.push(array[j]);
            } else {
                count1++;
                array1.push(array[j]);
            }
        }
        if (count0 > count1) {
            // заменяем старый массив на новый с новой кучкой
            if (n === 1) {
                array = array0;
            } else if (n === 0) {
                array = array1;
            }

        } else if (count0 < count1) {
            // заменяем старый массив на новый с новой кучкой
            if (n === 1) {
                array = array1;
            } else if (n === 0) {
                array = array0;
            }

        } else {
            // если осталось всего 2 значения, выбираем то, которое заканчивается на 1 или 0 в зависимости от параметра N
            if (n === 1) {
                array = array1;
            } else if (n === 0) {
                array = array0;
            }
        }
    }
    gasMarker = array[0];

    return gasMarker;
}

let decimalO2 = parseInt(parsingGas(dataArray, 1).reduce((a, b) => {return a + b}), 2);
let decimalCO2 = parseInt(parsingGas(dataArray, 0).reduce((a, b) => {return a + b}), 2);

console.log(decimalO2 * decimalCO2);
