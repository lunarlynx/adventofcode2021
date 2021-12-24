'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n");

// отсеиваем некорректные строки, чтобы оставить только незавершенные
// считаем очки за прерывающие символы в каждой строке
function sortIncompleteLines(array) {

    let result = [];
    let scoreArray = [];

    for (let i = 0; i < array.length; i++) {
        let stack = [];
        let stackEnds = [];
        let score = 0;

        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === "(" || array[i][j] === "{" || array[i][j] === "[" || array[i][j] === "<") {

                stack.push(array[i][j]);

            } else if ((array[i][j] === ")" && stack[stack.length - 1] === "(") ||
                (array[i][j] === "}" && stack[stack.length - 1] === "{") ||
                (array[i][j] === "]" && stack[stack.length - 1] === "[") ||
                (array[i][j] === ">" && stack[stack.length - 1] === "<")) {

                stack.pop();

            } else if ((array[i][j] === ")" && stack[stack.length - 1] !== "(") ||
                (array[i][j] === "}" && stack[stack.length - 1] !== "{") ||
                (array[i][j] === "]" && stack[stack.length - 1] !== "[") ||
                (array[i][j] === ">" && stack[stack.length - 1] !== "<")) {
                stack = [];
                break;
            }
        }

        if (stack.length !== 0) {
            stack.reverse();

            for (let j = 0; j < stack.length; j++) {
                if (stack[j] === "(") {
                    score = score * 5 + 1;
                }
                if (stack[j] === "{") {
                    score = score * 5 + 3;
                }
                if (stack[j] === "[") {
                    score = score * 5 + 2;
                }
                if (stack[j] === "<") {
                    score = score * 5 + 4;
                }
            }
            scoreArray.push(score);

        }
    }

    return scoreArray;

}

// сортировка и поиск медианного значения из массива очков
function findMiddleScore(array) {
    let sort = array.sort(function (a, b) {
        return a - b;
    });
    let l = sort.length - 1;
    return sort[l/2];
}

const errorsScoreArray = sortIncompleteLines(data);

console.log(findMiddleScore(errorsScoreArray));
