import Animal from "../model/animalModel.js";


const getRandomAnimal = () => {
    const animals = [
        "chicken", "chicken", "chicken",
        "duck", "duck", "duck",
        "rabbit", "rabbit", "rabbit",
        "pig", "pig",
        "sheep", "sheep",
        "horse",
        "cow",
        "empty", "empty", "empty", "empty", "empty"
    ];
    const randomAnimalIndex = Math.floor(Math.random() * animals.length);
    return animals[randomAnimalIndex];
}
  
export const catchAnimal = async (count)=> {
    const percentAnimals = {}
    const animals = {}
    const obj = {};
    const timeCatching = parseInt(count.toString());
    if(timeCatching === 1){
        const animal = getRandomAnimal();
        const animalDoc = await Animal.findOne({}).exec();
        animalDoc[animal] += 1;
        animalDoc.save();
        return {...obj, animal, animals: animalDoc.toObject()}
    }else if(timeCatching > 1){
        for (let i = 0; i < timeCatching; i++) {
            const animal = getRandomAnimal();
            if(timeCatching === 1){
                obj['animal'] = animal;
            }
            if (animals[animal]) {
                animals[animal] = animals[animal] + 1;
            } else {
                animals[animal] = 1;
            }
    
        }
        for (const key in animals) {
            if (key !== 'empty') {
                percentAnimals[key] = (animals[key] / timeCatching * 100).toFixed(2);
            } else {
                percentAnimals[key] = (animals[key] / timeCatching * 100).toFixed(2);
            }
        }
        return {...obj, animals, percentAnimals};
    }else{
        throw Error({message: 'Internal server', status: 500}) 
    }
    
};

export const handleCombine = async () => {  
    // Determine if the combination is successful (25% chance)
    const isSuccess = Math.random() <= 0.25;
   
    // Remove the 7 combined animals from the total counts
    const animalDoc = await Animal.findOne({}).exec();
    const animalCounts = animalDoc.toObject();
    for(const key in animalCounts){
        if(!animalCounts[key]) throw {name: "Error", status: 403, message: "Animals cannot be combined because they have already been combined in another session!"};
        await Animal.findOneAndUpdate({}, { [key]: animalCounts[key] - 1 }).exec();
    }
    if(isSuccess) return { success: true }  
    return { success: false };
}

  