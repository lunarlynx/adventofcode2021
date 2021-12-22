'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const crabArray = String(buffer).trim().split(",").map(el => Number(el));

// Найти максимум из расстояний - это будет число точек, от которых будем считать топливо
const maxCrab = Math.max(...crabArray);

// Для каждой точки посчитать расстояние до нее от каждого краба
// Усложняется тем, что считать мы должны n + (n-1) + (n-2) + ... + (n - n)
// Суммировать все затраты
// Взять наименьшую сумму
function fuelsForOnePoint(crabArray) {
    let minSum = undefined;
    for (let i = 0; i <= maxCrab; i++) {
        let s = 0;
        for (let j = 0; j < crabArray.length; j++) {
            let justS = Math.abs(crabArray[j] - i);
            let sumJustS = 0;
            for (let k = 0; k <= justS; k++) {
                sumJustS = sumJustS + k;
            }
            s = s + sumJustS;
        }
        if (minSum === undefined || s <= minSum) {
            minSum = s;
        }
    }
    return minSum;
}

console.log(fuelsForOnePoint(crabArray));
