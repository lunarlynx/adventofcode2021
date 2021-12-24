'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const data = String(buffer).trim().split("\n");

// отсеиваем незавершенные строки, чтобы оставить только некорректные
function sortIncorrectLines(array) {

    let result = [];
    let score = 0;

    for (let i = 0; i < array.length; i++) {
        let stack = [];

        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === "(" || array[i][j] === "{" || array[i][j] === "[" || array[i][j] === "<") {

                stack.push(array[i][j]);

            } else if ((array[i][j] === ")" && stack[stack.length - 1] === "(") ||
                (array[i][j] === "}" && stack[stack.length - 1] === "{") ||
                (array[i][j] === "]" && stack[stack.length - 1] === "[") ||
                (array[i][j] === ">" && stack[stack.length - 1] === "<")) {

                stack.pop();

            } else {

                if (array[i][j] === ")") {
                    score = score + 3;
                }
                if (array[i][j] === "}") {
                    score = score + 1197;
                }
                if (array[i][j] === "]") {
                    score = score + 57;
                }
                if (array[i][j] === ">") {
                    score = score + 25137;
                }

                result.push(array[i]);
                break;

            }
        }
    }

    return score;

}

const incorrectLines = sortIncorrectLines(data);

console.log(incorrectLines);
