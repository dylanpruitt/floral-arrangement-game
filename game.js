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
        restockShopInventory(1);
        if (arrangementNumber % 3 == 0) {
            shop();
        }
    
        arrangementNumber++;
        if (arrangementNumber % 7 == 0) {
            size = 5;
        } else {
            size = 3;
        }

        generateEmptyArrangement(); 
        document.getElementById("map-container").innerHTML = "";
        createMap();
        for (let i = 0; i < flowerArrangement.length; i++) {
            updateFlowerText(i);
            updateFlowerImage(i);
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
        updateFlowerText(i);
        updateFlowerImage(i);
    }
    updateInventoryText();
}

let updateFlowerText = (index) => {
    let x = Math.floor(index / size);
    let y = index % size;
    let score = getFlowerScore(x, y);
    
    document.getElementById("flower-text-" + index).innerHTML = score;
    document.getElementById("flower-text-" + index).title = "How much score this flower gives you.";
}

let updateFlowerImage = (index) => {
    let flower = flowerArrangement[index];
    let imageSource = "assets/" + flower.picture;
    document.getElementById("flower-image-" + index).src = imageSource;
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

    let shopContainer = document.createElement("div");
    shopContainer.id = "shop-container";
    document.body.appendChild(shopContainer);

    let text = document.createElement("p");
    text.id = "shop-header";
    text.innerHTML = "SHOP";
    shopContainer.appendChild(text);

    let checkoutText = document.createElement("p");
    checkoutText.id = "checkout-price";
    checkoutText.innerHTML = "Checkout price: $0";
    shopContainer.appendChild(checkoutText);

    for (let i = 0; i < shopInventory.length; i++) {
        let flowerIndex = getFlowerIndexFromName(shopInventory[i].name);
        let flower = flowers[flowerIndex](-1, -1);
        let message = shopInventory[i].name + " (" + shopInventory[i].amount + ") - $" + flower.cost;
        let itemDescription = document.createElement("label");
        itemDescription.innerHTML = message + "   ";
        itemDescription.for = "shop-input-" + i;
        shopContainer.appendChild(itemDescription);

        let input = document.createElement("input");
        input.type = "number";
        input.id = "shop-input-" + i;
        input.className = "shop-input";
        input.name = "shop-input-" + i;
        input.min = 0;
        input.max = shopInventory[i].amount;
        input.value = 0;
        input.onchange = function () { updateCheckoutText(); };
        shopContainer.appendChild(input);

        shopContainer.appendChild(document.createElement("br"));
        shopContainer.appendChild(document.createElement("br"));
    }

    let checkoutButton = document.createElement("button");
    checkoutButton.id = "checkout-button";
    checkoutButton.innerHTML = "Checkout";
    checkoutButton.onclick = function () { checkout(); }
    shopContainer.appendChild(checkoutButton);
}

let checkout = () => {
    let price = getCheckoutPrice();

    if (money >= price) {
        for (let i = 0; i < shopInventory.length; i++) {
            let input = document.getElementById("shop-input-" + i);
            let amount = parseInt(input.value);
            if (amount > 0) {
                addItem(inventory, shopInventory[i].name, amount);
                addItem(shopInventory, shopInventory[i].name, amount * -1);
            }
        }
    
        money -= price;
        updateShopInventory();

        document.body.removeChild(document.getElementById("shop-container"));
    
        let moneyText = document.getElementById("money");
        moneyText.innerHTML = "$" + money.toString().padStart(4, "0");
        updateInventoryText();
    }
}

let updateShopInventory = () => {
    let tempInventory = [];
    for (let i = 0; i < shopInventory.length; i++) {
        if (shopInventory[i].amount > 0) {
            tempInventory.push(shopInventory[i]);
        }
    }
    shopInventory = tempInventory;
}

let updateCheckoutText = () => {
    let checkoutText = document.getElementById("checkout-price");
    checkoutText.innerHTML = "Checkout price: $" + getCheckoutPrice();
}

let getCheckoutPrice = () => {
    let price = 0;

    for (let i = 0; i < shopInventory.length; i++) {
        let flowerIndex = getFlowerIndexFromName(shopInventory[i].name);
        let flower = flowers[flowerIndex](-1, -1);
        let input = document.getElementById("shop-input-" + i);
        let amount = parseInt(input.value);
        price += flower.cost * amount;
    }

    return price;
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

let createMap = function () {
    for (let i = 0; i < size * size; i++) {
        let x = i % size, y = Math.floor(i / size);
        var div = document.createElement("div");
        div.id = "map-tile-" + i;
        div.className = "map-tile";
        div.style.width = (100 / size) + "%";
        div.style.height = (100 / size) + "%";
        div.style.left = (x * (100 / size)) + "%";
        div.style.top = (y * (100 / size)) + "%";

        document.getElementById("map-container").appendChild(div);
        document.getElementById("map-tile-" + i).onclick = function () { 
            if (stillPlaying) {
                plantFlower(selectedFlowerName, i);
            }
        };

        let flowerImage = document.createElement("img");
        flowerImage.id = "flower-image-" + i;
        flowerImage.className = "flower-image";
        flowerImage.src = "assets/empty.jfif";
        document.getElementById("map-tile-" + i).appendChild(flowerImage);

        let flowerText = document.createElement("p");
        flowerText.id = "flower-text-" + i;
        flowerText.className = "flower-text";
        flowerText.innerHTML = "Empty";
        document.getElementById("map-tile-" + i).appendChild(flowerText);
    }
}