import Animal from "../model/animalModel.js";

const animalProbabilities = [
    { animal: "chicken", probability: 0.15 },
    { animal: "duck", probability: 0.15 },
    { animal: "rabbit", probability: 0.15 },
    { animal: "pig", probability: 0.10 },
    { animal: "sheep", probability: 0.10 },
    { animal: "horse", probability: 0.05 },
    { animal: "cow", probability: 0.05 },
];
  
export const catchAnimal = ()=> {
    const animals = [
        "chicken", "chicken", "chicken",
        "duck", "duck", "duck",
        "rabbit", "rabbit", "rabbit",
        "pig", "pig",
        "sheep", "sheep",
        "horse",
        "cow"
    ];
    const randomAnimalIndex = Math.floor(Math.random() * animals.length);
    return animals[randomAnimalIndex];
}

export const updateCountAnimal = async (animal) => {
    const animalDoc = await Animal.findOne({}).exec();
    animalDoc[animal] += 1;
    animalDoc.save();
    return animalDoc.toObject();
}

export const handleCombine = async () => {  
    // Determine if the combination is successful (25% chance)
    const isSuccess = Math.random() <= 0.25;
   
    // Remove the 7 combined animals from the total counts
    const animalDoc = await Animal.findOne({}).exec();
    const animalCounts = animalDoc.toObject();
    for(const key in animalCounts){
        Animal.findOneAndUpdate({}, { [key]: animalCounts[key] - 1 }).exec();
    }
    if(isSuccess) return { success: true }  
    return { success: false };
}

  