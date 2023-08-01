import Animal from "../model/animalModel.js";

export class NotEnoughAnimalsError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotEnoughAnimalsError";
    }
}
  
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
        if(!animalCounts[key]) throw new NotEnoughAnimalsError("Animals cannot be combined because they have already been combined in another session!");
        Animal.findOneAndUpdate({}, { [key]: animalCounts[key] - 1 }).exec();
    }
    if(isSuccess) return { success: true }  
    return { success: false };
}

  