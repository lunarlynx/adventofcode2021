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
            if (card[i][j] >= 0) {
                arr.push(card[i][j]);
            }
        }
    }
    return arr;
}

// проверка, что в карточке есть заполненные строка или столбец
function isItBingo(card) {

    for (let i = 0; i < 5; i++) {
        let countMinusI = 0;

        for (let j = 0; j < 5; j++) {
            if (card[i][j] < 0) {
                countMinusI++;
            }
        }
        if (countMinusI === 5) {
            return true;
        }
    }
    for (let i = 0; i < 5; i++) {
        let countMinusJ = 0;

        for (let j = 0; j < 5; j++) {
            if (card[j][i] < 0) {
                countMinusJ++;
            }
        }
        if (countMinusJ === 5) {
            return true;
        }
    }
    return false;
}

function bingoGame(line, cards) {
    let noSuccess = [];
    let currentNumber = 0;
    let winCard = [];
    let countWinners = 0;

    // перебираем бочонки
    for (let i = 0; i < line.length; i++) {

        // перебираем карточки [ [],[],[] ]
        for (let j = 0; j < cards.length; j++) {
            // если нашли номер и проверка на бинго в карточке успешна, кладем ее данные в переменные
            if (findNumberInTheCard(cards[j], line[i]) && isItBingo(cards[j]) && countWinners <= cards.length) {
                countWinners++;
                currentNumber = line[i];
                noSuccess = findNoSuccessNumbers(cards[j]);
                winCard = cards[j];
            } else {
                continue;
            }
        }
    }
    return [winCard, noSuccess, currentNumber];
}

let bingoWinner = bingoGame(bingoLine, newBingoCards);
// let sumNoSuccess = bingoWinner[0].reduce((a, b) => (a + b));
// let bingoWinNumber = bingoWinner[1];
// let result = sumNoSuccess * bingoWinNumber;

console.log(bingoWinner);
