let flowerArrangement = [];
let size = 3;

let totalScore = 0;
let money = 50;
let arrangementNumber = 1;
let stillPlaying = true;

let inventory = [];
let shopInventory = [];

let selectedFlowerName = "Empty";

let inventoryPair = (name, amount) => {
    return {
        name: name,
        amount, amount
    };
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
    updateInventoryText();
}

let submitArrangement = () => {
    if (stillPlaying) {
        updateMoneyAndScore();
        if (arrangementNumber % 3 == 0) {
            shop();
        }
    
        arrangementNumber++;
        generateEmptyArrangement(); 
        for (let i = 0; i < flowerArrangement.length; i++) {
            updateFlowerText(i, flowerArrangement[i].name);
        } 
    } 

    if (money <= 0) {
        alert("Game over! Your score: " + totalScore);
        stillPlaying = false;
    }
}

let plantFlower = (flowerName, index) => {
    let x = index / size;
    let y = index % size;
    let flower = flowers[getFlowerIndexFromName(flowerName)](x, y);
    let flowerInventoryIndex = returnInventoryIndex(inventory, flower.name);

    if (flowerInventoryIndex >= 0 && index >= 0 && index < flowerArrangement.length) {
        if (flowerArrangement[index].name === "Empty") {
            flowerArrangement[index] = flower;
        } else {
            let previousFlowerName = flowerArrangement[index].name;
            addItem(inventory, previousFlowerName, 1);
        }

        addItem(inventory, flower.name, -1);
        if (inventory[flowerInventoryIndex].amount <= 0) {
            inventory.splice(flowerInventoryIndex, 1);
        }

        flowerArrangement[index] = flower;
    }

    for (let i = 0; i < flowerArrangement.length; i++) {
        updateFlowerText(i, flowerArrangement[i].name);
    }
    updateInventoryText();
}

let updateFlowerText = (index, flowerName) => {
    let x = Math.floor(index / size);
    let y = index % size;
    let score = getFlowerScore(x, y);
    document.getElementById("flower-text-" + index).innerHTML = flowerName + " (" + score + ")";
}

let updateMoneyAndScore = () => {
    money += getArrangementScore();
    totalScore += getArrangementScore();
    let moneyText = document.getElementById("money");
    moneyText.innerHTML = "$" + money.toString().padStart(4, "0");
    document.getElementById("total-score").innerHTML = totalScore.toString().padStart(5, "0");
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
        updateInventoryText();
        shopInventory[index].amount -= amount;
        if (shopInventory[index].amount <= 0) {
            shopInventory.splice(index, 1);
        }   
    }
}

let updateInventoryText = () => {
    let inventoryDIV = document.getElementById("inventory");
    inventoryDIV.innerHTML = "";
    let text = document.createElement("p");
    text.innerHTML = "INVENTORY";
    inventoryDIV.appendChild(text);
    for (let i = 0; i < inventory.length; i++) {
        let message = inventory[i].name + " (" + inventory[i].amount + ")"; 
        let inventoryText = document.createElement("p");
        inventoryText.id = "inventory-text-" + i;
        inventoryText.innerHTML = message;
        inventoryText.onclick = function () { 
            selectedFlowerName = inventory[i].name;
            console.log("selected " + selectedFlowerName);
        };
        inventoryDIV.appendChild(inventoryText);
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