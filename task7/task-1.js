'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const crabArray = String(buffer).trim().split(",").map(el => Number(el));

// Найти максимум из расстояний - это будет число точек, от которых будем считать топливо
const maxCrab = Math.max(...crabArray);

// Для каждой точки посчитать расстояние до нее от каждого краба
// Суммировать все затраты
// Взять наименьшую сумму
function fuelsForOnePoint(crabArray) {
    let minSum = undefined;
    for (let i = 0; i <= maxCrab; i++) {
        let s = 0;
        for (let j = 0; j < crabArray.length; j++) {
            s = s + Math.abs(crabArray[j] - i);
        }
        if (minSum === undefined || s <= minSum) {
            minSum = s;
        }
    }
    return minSum;
}

console.log(fuelsForOnePoint(crabArray));
