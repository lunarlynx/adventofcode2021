'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n").map(el => String(el).split(""));
const octopuses = data.map(el => el.map(e => Number(e)));

function getValue(arr, i, j) {
    let arrElement = arr[i] ?? [];

    return arrElement[j];
}

// эффект вспышки, добавляем всем окружающим клеткам единицу
function flashEffect(array, i, j) {

    array[i][j] = 0;

    let lefttop = getValue(array, i - 1, j - 1);
    let centertop = getValue(array, i, j - 1);
    let righttop = getValue(array, i + 1, j - 1);
    let centerleft = getValue(array, i - 1, j);
    let rightcenter = getValue(array, i + 1, j);
    let leftbottom = getValue(array, i - 1, j + 1);
    let centerbottom = getValue(array, i, j + 1);
    let rightbottom = getValue(array, i + 1, j + 1);

    if (lefttop !== undefined && lefttop > 0) {
        array[i - 1][j - 1] = lefttop + 1;
    }
    if (centertop !== undefined && centertop > 0) {
        array[i][j - 1] = centertop + 1;
    }
    if (righttop !== undefined && righttop > 0) {
        array[i + 1][j - 1] = righttop + 1;
    }
    if (centerleft !== undefined && centerleft > 0) {
        array[i - 1][j] = centerleft + 1;
    }
    if (rightcenter !== undefined && rightcenter > 0) {
        array[i + 1][j] = rightcenter + 1;
    }
    if (leftbottom !== undefined && leftbottom > 0) {
        array[i - 1][j + 1] = leftbottom + 1;
    }
    if (centerbottom !== undefined && centerbottom > 0) {
        array[i][j + 1] = centerbottom + 1;
    }
    if (rightbottom !== undefined && rightbottom > 0) {
        array[i + 1][j + 1] = rightbottom + 1;
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] > 9) {
                array = flashEffect(array, i, j);
            }
        }
    }

    return array;
}

// добавляем энергию каждому осьминогу, ждем вспышку и добавляем энергию всем осьминогам вокруг
function countFlash(array) {
    let count = 0;

    for (let c = 0; c < 100; c++) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j] = array[i][j] + 1;
            }
        }

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] > 9) {
                    array = flashEffect(array, i, j);
                }
            }
        }

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 0) {
                    count++;
                }
            }
        }
    }

    return count;
}


console.log(countFlash(octopuses));
