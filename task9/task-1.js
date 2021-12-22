'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n").map(el => el.split("").map(Number));

function getValue(arr, i, j) {
    let arrElement = arr[i] ?? [];

    return arrElement[j];
}

// Ищем все точки, вокруг которых находятся числа крупнее этой точки
function findLowPoints(array) {
    let count = 0;
    let sum = 0;
    const max = array.length;

    for (let i = 0; i < max; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let minus_i = getValue(array, i - 1, j);
            let minus_j = getValue(array, i, j - 1);
            let plus_i = getValue(array, i + 1, j);
            let plus_j = getValue(array, i, j + 1);

            if ((minus_j === undefined || array[i][j] < array[i][j - 1]) &&
                (plus_i === undefined || array[i][j] < array[i + 1][j]) &&
                (plus_j === undefined || array[i][j] < array[i][j + 1]) &&
                (minus_i === undefined || array[i][j] < array[i - 1][j])) {

                count++;
                sum = sum + array[i][j];

            }
        }
    }
    return count + sum;
}

console.log(findLowPoints(data));
