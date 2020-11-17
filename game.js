let flowerArrangement = [];
let size = 3;

let totalScore = 0;
let money = 100;

let inventory = [];
let shopInventory = [];

let inventoryPair = (name, amount) => {
    return {
        name: name,
        amount, amount
    };
}

let gameLoop = () => {
    // give player starting flowers
    // a r r a n g e m e n t
        // input
        // confirm finished
        // check score
        // if bankrupt goto lost
    // after every three arrangements
        // restock shop
        // do shop
    // if lost
        // high score logic
}

let generateEmptyArrangement = () => {
    let EMPTY = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            flowerArrangement.push(flowers[EMPTY](i, j));
        }
    }
}

let getArrangementScore = () => {
    let totalScore = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            totalScore += getFlowerScore(i, j);
        }
    }
    return totalScore;
}

let getFlowerScore = (x, y) => {
    let flowerIndex = (x * size + y);
    let flower = flowerArrangement[flowerIndex];
    let totalScore = flower.baseScore;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i + x >= 0 && j + y >= 0 && (i + x != x || j + y != y)
                && i + x < size && j + y < size) {

                let otherFlowerIndex = ((x + i) * size + (y + j));
                let otherFlower = flowerArrangement[otherFlowerIndex];
                totalScore += flower.getSynergy(otherFlower.name);
            }
        }
    }

    return totalScore;
}

let getArrangementCost = () => {
    let totalCost = 0;
    for (let i = 0; i < size * size; i++) {
        totalCost += flowerArrangement[i].cost;
    }
    return totalCost;
}

let restockShopInventory = (numberOfItems) => {
    for (let i = 0; i < numberOfItems; i++) {
        let randomIndex = 0;
        while (randomIndex == 0) {
            randomIndex = Math.floor(Math.random() * flowers.length);
        }
        let flower = flowers[randomIndex](-1, -1);
        let amount = Math.floor(Math.random() * 11) + 15;
        addItem(shopInventory, flower.name, amount);
    }
}

let addItem = (inventory, name, amount) => {
    let index = returnInventoryIndex(shopInventory, name);
    if (index != -1) {
        inventory[index].amount += amount;
    } else {
        inventory.push(inventoryPair(name, amount));
    }
}

let returnInventoryIndex = (inventory, name) => {
    let NOT_FOUND = -1;
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name === name) {
            return i;
        }
    }
    return NOT_FOUND;
}