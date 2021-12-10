'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const fishArray = String(buffer).trim().split(",").map(el => Number(el));

const fishObj = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
}

// собираем объект из начальных возрастов рыб
function collectFishObject(array) {

    for (let i = 0; i < array.length; i++) {
        let old = fishObj[array[i]];
        if (old == undefined) {
            old =  0;
        }
        fishObj[array[i]] =  old + 1;
    }

    return fishObj;
}

collectFishObject(fishArray);

// запускаем 256-дневный цикл
for (let i = 0; i < 256; i++) {
    let obj0 = fishObj['0'];
    let obj1 = fishObj['1'];
    let obj2 = fishObj['2'];
    let obj3 = fishObj['3'];
    let obj4 = fishObj['4'];
    let obj5 = fishObj['5'];
    let obj6 = fishObj['6'];
    let obj7 = fishObj['7'];
    let obj8 = fishObj['8'];

    for (let key in fishObj) {
        if (fishObj[key] !== 0) {
            if (key === '1') {
                 obj0 = obj0 + fishObj['1'];
                 obj1 = obj1 - fishObj['1'];

             } else if (key === '2') {
                 obj1 = obj1 + fishObj['2'];
                 obj2 = obj2 - fishObj['2'];

             } else if (key === '3') {
                 obj2 = obj2 + fishObj['3'];
                 obj3 = obj3 - fishObj['3'];

             } else if (key === '4') {
                 obj3 = obj3 + fishObj['4'];
                 obj4 = obj4 - fishObj['4'];

             } else if (key === '5') {
                 obj4 = obj4 + fishObj['5'];
                 obj5 = obj5 - fishObj['5'];

             } else if (key === '6') {
                 obj5 = obj5 + fishObj['6'];
                 obj6 = obj6 - fishObj['6'];

             } else if (key === '7') {
                 obj6 = obj6 + fishObj['7'];
                 obj7 = obj7 - fishObj['7'];

             } else if (key === '8') {
                 obj7 = obj7 + fishObj['8'];
                 obj8 = obj8 - fishObj['8'];
             } else if (key === '0') {
                obj6 = obj6 + fishObj['0'];
                obj8 = obj8 + fishObj['0'];
                obj0 = obj0 - fishObj['0'];
            }
        }
    }
    fishObj['0'] = obj0;
    fishObj['1'] = obj1;
    fishObj['2'] = obj2;
    fishObj['3'] = obj3;
    fishObj['4'] = obj4;
    fishObj['5'] = obj5;
    fishObj['6'] = obj6;
    fishObj['7'] = obj7;
    fishObj['8'] = obj8;
}

function sumFish(obj) {
    let sum = 0;
    for (const key in obj) {
        sum = sum + obj[key];
    }
    return sum;
}



console.log(sumFish(fishObj));
