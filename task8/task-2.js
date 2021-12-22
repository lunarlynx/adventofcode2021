'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n").map(el => el.split(" | "));
const input = [];
const output = [];

for (let i = 0; i < data.length; i++) {
    let dataInput = data[i][0].split(" ");
    let dataOutput = data[i][1].split(" ");
    input.push(dataInput);
    output.push(dataOutput);
}

// нужно составить паззл, где какие сегменты располагаются в виде:
//  aaaa
// b    c
// b    c
//  dddd
// f    e
// f    e
//  gggg
// Ищем пересечения цифр, чтобы исключить варианты
// Нашли, как выглядят все цифры и сопостовляем их набору output
// Получившиеся четырехзначные значения складываем

// проверяем, что одна цифра содержит другую
// dig2 всегда меньшего размера, проверяем, что содержится именно она
function containedDig(dig1, dig2) {
    let comb1 = dig1.split("");
    let comb2 = dig2.split("");
    let int = [];

    int = comb1.filter(value => comb2.includes(value));

    if (comb2.length === int.length) {
        return true;
    } else {
        return false;
    }
}

// ищем пересечение двух цифр
function intersection(dig1, dig2) {
    let comb1 = dig1.split("");
    let comb2 = dig2.split("");
    let int = [];

    if (comb1.length > comb2.length) {
        int = comb1.filter(value => !comb2.includes(value));
    } else {
        int = comb2.filter(value => !comb1.includes(value));
    }

    return int;
}

// сохраним из массива известные цифры 1, 4, 7, 8
function knownDigs(array) {
    let one = undefined;
    let four = undefined;
    let seven = undefined;
    let eight = undefined;

    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 2) {
            one = array[i];
        } else if (array[i].length === 3) {
            seven = array[i];
        } else if (array[i].length === 4) {
            four = array[i];
        } else if (array[i].length === 7) {
            eight = array[i];
        }
    }

    return [0, one, 0, 0, four, 0, 0, seven, eight, 0];
}

// выявляем соответствия в одной строке
function equalGame(array) {
    // [1, 4, 7, 8]
    let known = knownDigs(array);

    // ищем цифру 6 методом проверки, содержится ли в массиве длиной в 6 символов семерка
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 6 && !containedDig(array[i], known[7])) {
            known[6] = array[i];
        }
    }

    // ищем цифру 5 методом проверки, содержится ли массиве длиной в 5 символов в шестерке
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 5 && containedDig(known[6], array[i])) {
            known[5] = array[i];
        }
    }

    // ищем цифру 3 методом проверки, содержится ли массиве длиной в 5 символов семерка
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 5 && containedDig(array[i], known[7])) {
            known[3] = array[i];
        }
    }

    // оставшийся набор из 5 символов - это двойка
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 5 && array[i] !== known[3] && array[i] !== known[5]) {
            known[2] = array[i];
        }
    }

    // ищем цифру 9 методом проверки, содержит ли массив длиной в 6 символов цифру 5, и это не шестерка
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 6 && containedDig(array[i], known[5]) && array[i] !== known[6]) {
            known[9] = array[i];
        }
    }

    // ищем цифру 0 методом проверки, содержит ли массив длиной в 6 символов цифру 5
    for (let i = 0; i < array.length; i++) {
        if (array[i].length === 6 && !containedDig(array[i], known[5])) {
            known[0] = array[i];
        }
    }

    return known;
}

// ищем, каким цифрам соответствуют выходные данные в одной строке
// array1 - входные данные
// array2 - выходные данные
function whatNumber(arr1, arr2) {
    let rightDigs = equalGame(arr1);
    let outDigs = arr2;
    let finalCombo = [];

    for (let i = 0; i < rightDigs.length; i++) {
        rightDigs[i] = rightDigs[i].split("").sort().join();
    }
    for (let i = 0; i < outDigs.length; i++) {
        outDigs[i] = outDigs[i].split("").sort().join();
    }

    for (let i = 0; i < outDigs.length; i++) {
        for (let j = 0; j < rightDigs.length; j++) {
            if (outDigs[i] === rightDigs[j]) {
                finalCombo.push(String(j));
            }
        }
    }

    finalCombo = finalCombo.reduce(function(a, b) {
        return a + b;
    });

    return Number(finalCombo);
}

// собираем массив выходных значений
// arr1 = input
// arr2 = output
function collectOutSings(arr1, arr2) {
    let finalCombos = [];

    for (let i = 0; i < input.length; i++) {
        let c = whatNumber(input[i], output[i]);
        finalCombos.push(c);
    }
    return finalCombos;
}

// складываем все выходные значения
function sumFinalCombos(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    return sum;
}

let arr = collectOutSings(input, output);

console.log(sumFinalCombos(arr));

