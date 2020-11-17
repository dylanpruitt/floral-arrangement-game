let flowerArrangement = [];
let size = 3;

let totalScore = 0;
let money = 200;

let inventory = [];
let shopInventory = [];

let inventoryPair = (name, amount) => {
    return {
        name: name,
        amount, amount
    };
}

let gameLoop = () => {
    let looping = true;
    let arrangementNumber = 1;

    giveStartingFlowers();
    while (looping) {
        arrangement();
        if (arrangementNumber % 3 == 0) {
            restockShopInventory(2);
            shop();
        }
        arrangementNumber++;
        if (money <= 0) {
            looping = false;
        }
    }

    if (money <= 0) {
        alert("Game over! Your score: " + totalScore);
    }
}

let giveStartingFlowers = () => {
    let flowerTypes = 4;
    for (let i = 0; i < flowerTypes; i++) {
        let randomIndex = 0;
        while (randomIndex == 0) {
            randomIndex = Math.floor(Math.random() * flowers.length);
        }
        let flower = flowers[randomIndex](-1, -1);
        let amount = 12;
        addItem(inventory, flower.name, amount);
    }
}

let arrangement = () => {
    generateEmptyArrangement();

    let arranging = true;
    while (arranging) {
        let message = "ARRANGEMENT: Enter a number to plant flowers (-1 to quit)\n";
        message += "$" + money + "\n";
        for (let i = 0; i < inventory.length; i++) {
            message += i + " - " + inventory[i].name + " (" + inventory[i].amount + ")\n"; 
        }
        message += "-----------------\n";
        for (let i = 0; i < flowerArrangement.length; i++) {
            message += i + " - " + flowerArrangement[i].name + "\n"; 
        }
        let input = parseInt(prompt(message));
        if (input == -1) {
            arranging = false;
        } else if (input < inventory.length) {
            let index = input;
            message = "X coordinate to plant: ";
            let x = parseInt(prompt(message));
            message = "Y coordinate to plant: ";
            let y = parseInt(prompt(message));
            let flowerName = inventory[index].name;
            let flowerIndex = getFlowerIndexFromName(flowerName);
            let flowerArrangementIndex = x * size + y;
            flowerArrangement[flowerArrangementIndex] = flowers[flowerIndex](x, y);
            inventory[index].amount--;
            if (inventory[index].amount <= 0) {
                inventory.splice(index, 1);
            }
        }
    }

    money += getArrangementScore();
    totalScore += getArrangementScore();
    let moneyText = document.getElementById("money");
    moneyText.innerHTML = "$" + money.toString().padStart(4, "0");
    document.getElementById("total-score").innerHTML = totalScore.toString().padStart(4, "0");
    console.log("Net profit: $" + (getArrangementScore() - getArrangementCost()));
}

let generateEmptyArrangement = () => {
    let EMPTY = 0;
    flowerArrangement = [];

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

let shop = () => {
    let shopping = true;
    while (shopping) {
        let message = "SHOP: Enter a number to buy flowers (-1 to quit)\n";
        message += "$" + money + "\n";
        for (let i = 0; i < shopInventory.length; i++) {
            message += i + " - " + shopInventory[i].name + " (" + shopInventory[i].amount + ")\n"; 
        }
        let input = parseInt(prompt(message));
        if (input == -1) {
            shopping = false;
        } else if (input < shopInventory.length) {
            let index = input;
            message = "Buying how much? Max: " + shopInventory[index].amount;
            input = parseInt(prompt(message));
            buyItem(index, input);
        }
    }
}

let buyItem = (index, amount) => {
    let flowerName = shopInventory[index].name;
    let flowerIndex = getFlowerIndexFromName(flowerName);
    let flower = flowers[flowerIndex](-1, -1);
    let cost = flower.cost * amount;

    if (money >= cost) {
        money -= cost;
        addItem(inventory, flowerName, amount);
        shopInventory[index].amount -= amount;
        if (shopInventory[index].amount <= 0) {
            shopInventory.splice(index, 1);
        }   
    }
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
    let index = returnInventoryIndex(inventory, name);
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