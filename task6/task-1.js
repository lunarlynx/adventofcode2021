'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const fishArray = String(buffer).trim().split(",").map(el => Number(el));

// проверяем, что рыба готова родить
function newFish(fish) {
    if (fish === 0) {
        fish = 6;
        return fish;
    } else if (fish > 0) {
        fish = fish - 1;
        return fish;
    }
}

// запускаем 80-дневный цикл
for (let i = 0; i < 80; i++) {
    let childs = [];
    let parents = [];

    for (let j = 0; j < fishArray.length; j++) {
        if (fishArray[j] === 0) {
            parents.push(newFish(fishArray[j]));
            childs.push(8);
        } else {
            parents.push(newFish(fishArray[j]));
        }
    }
    fishArray = [...parents, ...childs];
}

console.log(fishArray.length);
