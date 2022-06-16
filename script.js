//service arrays
let availableNumbers = {};
let availableNumbersUnique = [];
let availableNumbersHistory = [];
let square = {
    //this is a 9-number square with rows and columns
    0: [3, 4, 5],
    1: [6, 7, 8],
    2: [9, 10, 11]
}
//service strings with total attempts
let total = 0;
let unique = 0;

//service functions
const isMagicSquare = () => {
    let magicIndexes = 0;
    for (let i = 0; i < 3; i++) {
        if (square[i][0] * square[i][1] * square[i][2] ===
            square[0][i] * square[1][i] * square[2][i]) {
            magicIndexes++;
        }
    }
    return magicIndexes === 3;
}
const getDataFromSquare = (num) => {
    num = num - 3;
    const yPos = Math.floor(num / 3);
    const xPos = num - yPos * 3;
    return {value: square[yPos][xPos], yPos, xPos}
}
const resetAvailableNumbers = () => {
    for (let i = 3; i <= 11; i++) {
        availableNumbers[i - 3] = [i, true];
    }
    availableNumbersUnique = [];
}
const randomInteger = (min = 0, max = 8) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//main function
const findMagicSquare = () => {
    console.log('pending...');

    while (true) {
        total++;
        //cleaning service arrays on a new attempt
        resetAvailableNumbers();

        //making unique numbers array
        for (let i = 0; i < Object.keys(availableNumbers).length; i++) {
            while (true) {
                const int = randomInteger();
                if (!availableNumbersUnique.filter(el => el === availableNumbers[int][0]).length) {
                    availableNumbersUnique.push(availableNumbers[int][0]);
                    break;
                }
            }
        }
        //checking for duplicated array in history
        const availableNumbersString = availableNumbersUnique.join('');
        if (availableNumbersHistory.filter(el => el === availableNumbersString).length) {
            continue;
        }
        //pushing to history and adding a new unique attempt to string
        availableNumbersHistory.push(availableNumbersString);
        unique++;

        //pushing unique numbers to main object
        for (let i = 3; i < availableNumbersUnique.length + 3; i++) {
            let yPos = getDataFromSquare(i).yPos;
            let xPos = getDataFromSquare(i).xPos;
            square[yPos][xPos] = availableNumbersUnique[i - 3];
        }

        //console.log and break if successful
        if (isMagicSquare()) {
            console.log(`Found! Total attempts: ${total}, unique attempts: ${unique}`);
            console.log(...Object.keys(square).map(v => square[v]));
            //cleaning service array and strings
            availableNumbersHistory = [];
            total = 0;
            unique = 0;
            break;
        }
        if (total % 5000 === 0) {
            console.log(`attempt ${total}...`)
        }
    }
}