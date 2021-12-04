'use strict';

const fs = require('fs');

const buffer = fs.readFileSync('input.txt');

const dataArray = String(buffer).trim().split('\n\n').map(el => el.split("\n"));

const bingoLine = String(dataArray[0]).split(',');
const bingoCards = [...dataArray];
bingoCards.shift();

// проверка, что один конкретный номер присутствует в одной карточке
function findNumberInTheCard(card, number) {
    for (let i = 0; i < card.length; i++) {
        // элемент карточки все еще единая строка и содержит пробелы
        card[i].replace("  ", " ").split(" ");
        for (let j = 0; j < card[i].length; j++) {
            if (number === card[i][j]) {
                // сделаем это число отрицательным, чтобы отметить
                // TODO: возможно, надо все привести к числам
                card[i][j] = -card[i][j];
                return true;
            } else {
                return false;
            }
        }
    }
}

// считаем неуспешные номера, собираем их в массив (условие - они все положительные после прохождения предыдущей функции)
function findNoSuccessNumbers(card) {
    arr = 0;
    for (let i = 0; i < card.length; i++) {
        for (let j = 0; j < card[i].length; j++) {
            if (card[i][j] > 0) {
                arr.push(card[i][j]);
            }
        }
    }
    return arr;
}

// проверка, что в карточке есть заполненные строка или столбец
function isItBingo(card) {

}

function bingoGame(line, cards) {

    let noSuccess = [];

    // перебираем бочонки
    for (let i = 0; i < line.length; i++) {
        // сюда будем сохранять последний порядковый номер бочонка
        let currentNumber = 0;

        // перебираем карточки [ [],[],[] ]
        for (let j = 0; j < cards.length; j++) {
            // если не нашли номера в карточке, исключим ее из поиска
            if (!findNumberInTheCard(cards[j])) {
                cards.splice(cards[j], 1);
                // если нашли номер и проверка на бинго успешна
            } else if (findNumberInTheCard((cards[j]) && isItBingo(card[j])) {
                currentNumber = i;
                noSuccess = findNoSuccessNumbers(card[j]);
                // если нашли номер, но бинго еще не случилось, просто переходим к следующему номеру
            } else if (findNumberInTheCard(cards[j]) && !isItBingo(cards[j])) {
                continue;
            }
        }
    }

    // возвращаем порядковый номер и массив неотмеченных чисел
    return [noSuccess, currentNumber];
}

let sumNoSuccess = bingoGame(bingoLine, bingoCards)[0].reduce((a, b) => (a + b));
let result = bingoGame(bingoLine, bingoCards)[1] * sumNoSuccess;

console.log(result);
