'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const dataArray = String(buffer).trim().split('\n\n').map(el => el.split("\n"));

const bingoLine = String(dataArray[0]).split(',').map(Number);
const bingoCards = [...dataArray];
bingoCards.shift();
const newBingoCards = bingoCards.map(el => el.map(el => el.split(" ").filter(el => el.trim().length > 0).map(Number)));

// проверка, что один конкретный номер присутствует в одной карточке
function findNumberInTheCard(card, number) {
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[i].length; j++) {
            if (number === card[i][j]) {
                // сделаем это число отрицательным, чтобы отметить (-1 для значения 0)
                card[i][j] = -1;
                return true;
            }
        }
    }
    return false;
}

// считаем неуспешные номера, собираем их в массив (условие - они все положительные после прохождения предыдущей функции)
function findNoSuccessNumbers(card) {
    let arr = [];
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[i].length; j++) {
            if (card[i][j] > 0) {
                arr.push(card[i][j]);
            }
        }
    }
    return arr;
}

function arrayColumn(arr, n) {
    return arr.map(x => x[n]);
}

// проверка, что в карточке есть заполненные строка или столбец
function isItBingo(card) {
    let countMinusI = 0;
    let countMinusJ = 0;
    let column = [];

    for (let i = 0; i < card.length; i++) {
        column = arrayColumn(card, i);
        for (let j = 0; j < card[i].length; j++) {
            if (card[i][j] < 0) {
                countMinusI++;
            }
        }
    }
    for (let i = 0; i < column.length; i++) {
        for (let j = 0; j < column[i].length; j++) {
            if (card[i][j] < 0) {
                countMinusJ++;
            }
        }
    }
    if (countMinusI === 5 || countMinusJ === 5) {
        return true;
    } else {return false}
}

function bingoGame(line, cards) {

    let noSuccess = [];
    // сюда будем сохранять последний порядковый номер бочонка
    let currentNumber = 0;

    // перебираем бочонки
    for (let i = 0; i < line.length; i++) {

        // перебираем карточки [ [],[],[] ]
        for (let j = 0; j < cards.length; j++) {
            // если нашли номер и проверка на бинго в карточке успешна
            if (findNumberInTheCard(cards[j], i) && isItBingo(cards[j])) {
                console.log(cards[j]);
                currentNumber = i;
                noSuccess = findNoSuccessNumbers(cards[j]);
                console.log(noSuccess);
                return [noSuccess, currentNumber];
                break;
                // если нашли номер, но бинго еще не случилось, просто переходим к следующему номеру
            } else {
                continue;
            }
        }
    }
}

// TODO .reduce((a, b) => (a + b))
let sumNoSuccess = bingoGame(bingoLine, newBingoCards)[0];
let result = bingoGame(bingoLine, newBingoCards)[1] * sumNoSuccess;

// console.log(sumNoSuccess);
