let synergyPair = (name, points) => {
    let pair = {
        name: name,
        points: points
    }
    return pair;
}

let empty = (x, y) => {
    let flower = {
        name: "Empty",
        description: "No flowers here yet.",
        type: "na",
        cost: 0,
        baseScore: -5,
        x: x,
        y: y,
        synergies: [],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let rose = (x, y) => {
    let flower = {
        name: "Rose",
        description: "A white rose.",
        type: "focal",
        cost: 5,
        baseScore: 2,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", -5),
                synergyPair("Dahlia", -5),
                synergyPair("Sunflower", -4),
                synergyPair("Delphinium", 0),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", 2),
                synergyPair("Buttercup", 2),
                synergyPair("Dusty Miller", 1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let hydrangea = (x, y) => {
    let flower = {
        name: "Hydrangea",
        description: "A blue hydrangea.",
        type: "focal",
        cost: 5,
        baseScore: 2,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", -5),
                synergyPair("Hydrangea", 1),
                synergyPair("Dahlia", -5),
                synergyPair("Sunflower", -4),
                synergyPair("Delphinium", 2),
                synergyPair("Daisy", 0),
                synergyPair("Snapdragon", 2),
                synergyPair("Buttercup", 0),
                synergyPair("Dusty Miller", 2),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let dahlia = (x, y) => {
    let flower = {
        name: "Dahlia",
        description: "A pink dahlia.",
        type: "focal",
        cost: 5,
        baseScore: 2,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", -5),
                synergyPair("Hydrangea", -5),
                synergyPair("Dahlia", 1),
                synergyPair("Sunflower", -5),
                synergyPair("Delphinium", 1),
                synergyPair("Daisy", 2),
                synergyPair("Snapdragon", 1),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", 0),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let sunflower = (x, y) => {
    let flower = {
        name: "Sunflower",
        description: "A sunflower.",
        type: "focal",
        cost: 5,
        baseScore: 2,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", -5),
                synergyPair("Hydrangea", -5),
                synergyPair("Dahlia", -5),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", 1),
                synergyPair("Daisy", 2),
                synergyPair("Snapdragon", 1),
                synergyPair("Buttercup", 2),
                synergyPair("Dusty Miller", 0),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let delphinium = (x, y) => {
    let flower = {
        name: "Delphinium",
        description: "Some delphinium.",
        type: "filler",
        cost: 3,
        baseScore: 0,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", 0),
                synergyPair("Hydrangea", 2),
                synergyPair("Dahlia", 1),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", 1),
                synergyPair("Daisy", 0),
                synergyPair("Snapdragon", 1),
                synergyPair("Buttercup", 0),
                synergyPair("Dusty Miller", 1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let daisy = (x, y) => {
    let flower = {
        name: "Daisy",
        description: "A small daisy.",
        type: "filler",
        cost: 3,
        baseScore: 0,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", -1),
                synergyPair("Dahlia", 1),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", -1),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", -1),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", -1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let snapdragon = (x, y) => {
    let flower = {
        name: "Snapdragon",
        description: "Some snapdragon.",
        type: "filler",
        cost: 3,
        baseScore: 0,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", 1),
                synergyPair("Dahlia", -1),
                synergyPair("Sunflower", -1),
                synergyPair("Delphinium", 1),
                synergyPair("Daisy", -1),
                synergyPair("Snapdragon", 1),
                synergyPair("Buttercup", -1),
                synergyPair("Dusty Miller", 1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let buttercup = (x, y) => {
    let flower = {
        name: "Rose",
        description: "A buttercup.",
        type: "filler",
        cost: 3,
        baseScore: 0,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", -1),
                synergyPair("Dahlia", -1),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", -1),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", -1),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", -1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name === flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let dustyMiller = (x, y) => {
    let flower = {
        name: "Dusty Miller",
        description: "Some dusty miller.",
        type: "filler",
        cost: 3,
        baseScore: 0,
        x: x,
        y: y,
        synergies:
            [
                synergyPair("Delphinium", 2),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", 2),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", 1),
            ],
        getSynergy: (name) => {
            for (let i = 0; i < flower.synergies.length; i++) {
                if (name == flower.synergies[i].name) {
                    return flower.synergies[i].points;
                }
            }
                
            return 0;
        }
    }
    return flower;
}

let flowers = [empty, rose, hydrangea, dahlia, sunflower, delphinium, daisy, snapdragon, buttercup, dustyMiller];

let getFlowerIndexFromName = (name) => {
    let NOT_FOUND = -1;
    for (let i = 0; i < flowers.length; i++) {
        let flower = flowers[i](-1, -1);
        if (flower.name === name) {
            return i;
        }
    }
    return NOT_FOUND;
}