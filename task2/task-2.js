'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const pathArray = String(buffer).trim().split('\n').map(el => el.split(' '));

let depth = 0;
let path = 0;
let aim = 0;

function whereSubmarine(array) {

    let pos = 0;

    for (let i = 0; i < array.length; i++) {

        if (array[i][0] === 'forward') {
            path = path + Number(array[i][1]);
            depth = depth + aim * Number(array[i][1]);
        } else if (array[i][0] === 'down') {
            aim = aim + Number(array[i][1]);
        } else {
            aim = aim - Number(array[i][1]);
        }
    }

    pos = path * depth;
    return pos;

}

console.log(whereSubmarine(pathArray));
