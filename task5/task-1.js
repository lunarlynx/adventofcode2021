'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const dataArray = String(buffer).trim().split("\n").map(el => el.split(" -> "));
const pointsArray = dataArray.map(el => String(el).split(",").map(Number));

// проверка, что отрезок вертикальный или горизонтальный, x=x или y=y
function equalPoints(point) {
    if (point[0] === point[2] || point[1] === point[3]) {
        return true;
    } else {
        return false;
    }
}

// массив точек, которые соответствуют условию x=x или y=y
const equalPointsArray = pointsArray.filter(el => equalPoints(el));

// собираем массив точек, по которым проходит отрезок
function allPointsFromSection(section) {
    let pointsArray = [];
    let points = Math.abs((section[2] - section[0]) + (section[3] - section[1]));
    for (let i = 0; i <= points; i++) {
        if ((section[0] - section[2]) > 0) {
            let newPoint = [section[2] + i, section[1]];
            pointsArray.push(newPoint);
        } else if ((section[0] - section[2]) < 0) {
            let newPoint = [section[2] - i, section[1]];
            pointsArray.push(newPoint);
        } else if ((section[1] - section[3]) > 0) {
            let newPoint = [section[0], section[3] + i];
            pointsArray.push(newPoint);
        } else if ((section[1] - section[3]) < 0) {
            let newPoint = [section[0], section[3] - i];
            pointsArray.push(newPoint);
        }

    }
    return pointsArray;
}

// собираем все точки в один массив
function allPointsFromArray(array) {
    let allPointsArray = [];

    for (let i = 0; i < array.length; i++) {
        let oneSection = allPointsFromSection(array[i]);
        for (let j = 0; j < oneSection.length; j++) {
            allPointsArray.push(oneSection[j]);
        }
    }

    return allPointsArray;
}

// собираем коллекцию повторов
function collectOverlaySet(array) {
    let overlaySet = new Set();

    for (let i = 0; i < array.length; i++) {
        let prevX = array[i][0];
        let prevY = array[i][1];
        let nextX = array[i+1][0];
        let nextY = array[i+1][1];
        if (prevX === nextX && prevY === nextY) {
            overlaySet.add(array[i]);
        }
    }

    return overlaySet;
}

let points = allPointsFromArray(equalPointsArray);

console.log(collectOverlaySet(points));
