'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const pathArray = String(buffer).trim().split('\n').map(el => el.split(' '));

function whereSubmarine(array) {

    let depth = 0;
    let path = 0;
    let pos = 0;

    for (let i = 0; i < array.length; i++) {

        const sign = Number(array[i][1]);

        if (array[i][0] === 'forward') {
            path = path + sign;
        } else if (array[i][0] === 'down') {
            depth = depth + sign;
        } else {
            depth = depth - sign;
        }
    }

    pos = path * depth;
    return pos;

}

console.log(whereSubmarine(pathArray));
