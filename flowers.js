let synergyPair = (name, points) => {
    let pair = {
        name: name,
        points: points
    }
    return pair;
}

let rose = () => {
    let flower = {
        name: "Rose",
        description: "A white rose.",
        type: "focal",
        cost: 5,
        baseScore: 5,
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
    }
    return flower;
}

let hydrangea = () => {
    let flower = {
        name: "Hydrangea",
        description: "A blue hydrangea.",
        type: "focal",
        cost: 5,
        baseScore: 5,
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
    }
    return flower;
}

let dahlia = () => {
    let flower = {
        name: "Dahlia",
        description: "A pink dahlia.",
        type: "focal",
        cost: 5,
        baseScore: 5,
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
    }
    return flower;
}

let sunflower = () => {
    let flower = {
        name: "Sunflower",
        description: "A sunflower.",
        type: "focal",
        cost: 5,
        baseScore: 5,
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
    }
    return flower;
}

let delphinium = () => {
    let flower = {
        name: "Delphinium",
        description: "Some delphinium.",
        type: "filler",
        cost: 2,
        baseScore: 0,
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
    }
    return flower;
}

let daisy = () => {
    let flower = {
        name: "Daisy",
        description: "A small daisy.",
        type: "filler",
        cost: 2,
        baseScore: 0,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", 0),
                synergyPair("Dahlia", 1),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", 0),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", 0),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", 0),
            ],
    }
    return flower;
}

let snapdragon = () => {
    let flower = {
        name: "Snapdragon",
        description: "Some snapdragon.",
        type: "filler",
        cost: 2,
        baseScore: 0,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", 1),
                synergyPair("Dahlia", 0),
                synergyPair("Sunflower", 0),
                synergyPair("Delphinium", 1),
                synergyPair("Daisy", 0),
                synergyPair("Snapdragon", 1),
                synergyPair("Buttercup", 0),
                synergyPair("Dusty Miller", 1),
            ],
    }
    return flower;
}

let buttercup = () => {
    let flower = {
        name: "Rose",
        description: "A buttercup.",
        type: "filler",
        cost: 2,
        baseScore: 0,
        synergies:
            [
                synergyPair("Rose", 1),
                synergyPair("Hydrangea", 0),
                synergyPair("Dahlia", 0),
                synergyPair("Sunflower", 1),
                synergyPair("Delphinium", 0),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", 0),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", 0),
            ],
    }
    return flower;
}

let dustyMiller = () => {
    let flower = {
        name: "Dusty Miller",
        description: "Some dusty miller.",
        type: "filler",
        cost: 2,
        baseScore: 0,
        synergies:
            [
                synergyPair("Rose", 0),
                synergyPair("Hydrangea", 0),
                synergyPair("Dahlia", 0),
                synergyPair("Sunflower", 0),
                synergyPair("Delphinium", 2),
                synergyPair("Daisy", 1),
                synergyPair("Snapdragon", 2),
                synergyPair("Buttercup", 1),
                synergyPair("Dusty Miller", 1),
            ],
    }
    return flower;
}

let flowers = [rose, hydrangea, dahlia, sunflower, delphinium, daisy, snapdragon, buttercup, dustyMiller];