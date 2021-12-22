'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n").map(el => el.split("").map(Number));

function getValue(arr, i, j) {
    let arrElement = arr[i] ?? [];

    return arrElement[j];
}

// ищем окружение точки
function lowPointsRadar(array, i, j) {
    let count = 1;
    array[i][j] = -1;

    while (getValue(array, i - 1, j) !== 9 && getValue(array, i - 1, j) !== undefined && getValue(array, i - 1, j) > 0) {
        count = count + lowPointsRadar(array, i - 1, j);
        i--;
    }

    while (getValue(array, i, j - 1) !== 9 && getValue(array, i, j - 1) !== undefined && getValue(array, i, j - 1) > 0) {
        count = count + lowPointsRadar(array, i, j - 1);
        j--;
    }

    while (getValue(array, i + 1, j) !== 9 && getValue(array, i + 1, j) !== undefined && getValue(array, i + 1, j) > 0) {
        count = count + lowPointsRadar(array, i + 1, j);
        i++;
    }

    while (getValue(array, i, j + 1) !== 9 && getValue(array, i, j + 1) !== undefined && getValue(array, i, j + 1) > 0) {
        count = count + lowPointsRadar(array, i, j + 1);
        j++;
    }

    return count;
}

// Ищем для начала все глубокие точки, чтобы потом найти вокруг ямы
function findBasin(array) {
    let count = 0;
    let basins = [];
    let points = [];
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

                // убрать 63
                points.push(array[i][j]);
                count = lowPointsRadar(array, i, j);
                basins.push(count);

            }
        }
    }
    console.log(points);

    return basins;
}

console.log(findBasin(data));

