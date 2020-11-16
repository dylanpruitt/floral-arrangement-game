let flowerArrangement = [];
let size = 3;

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