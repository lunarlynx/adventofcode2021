'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n").map(el => el.split("").map(Number));

// Ищем все точки, вокруг которых находятся числа крупнее этой точки
function findLowPoints(array) {
    let count = 0;
    let sum = 0;
    const max = array.length;

    for (let i = 0; i < max; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let minus_i = array[i - 1][j] ?? undefined;
            let minus_j = array[i][j - 1] ?? undefined;
            let plus_i = array[i + 1][j] ?? undefined;
            let plus_j = array[i][j + 1] ?? undefined;

            if ((minus_j === undefined || array[i][j] < array[i][j - 1]) &&
                (plus_i === undefined || array[i][j] < array[i + 1][j]) &&
                (plus_j === undefined || array[i][j] < array[i][j + 1]) &&
                (minus_i === undefined || array[i][j] < array[i - 1][j])) {

                count++;
                sum = sum + array[i][j];

            }
        }
    }
    return count;
}

console.log(findLowPoints(data));
