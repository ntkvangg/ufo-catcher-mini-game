import express from 'express';
import Animal from '../model/animalModel.js';
import {catchAnimal, updateCountAnimal, handleCombine}  from '../controller/animalController.js';

const animalRouter = express.Router();

animalRouter.get('/', async (req, res) => {
    try {
        // Find the first document (if it exists) in the Animal collection
        const animalDoc = await Animal.findOne({}).exec();
        // If there's no document, create a new one with default values
        if (!animalDoc) {
          const newAnimal = new Animal();
          await newAnimal.save({ timestamps: { createdAt: false, updatedAt: false } });
          return res.json(newAnimal.toObject());
        }
        // Respond with the animal counts from the existing document
        res.json(animalDoc.toObject());
      } catch (error) {
        console.error("Error handling /animals request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

animalRouter.get('/catch', (req, res) => {
    try{
        const animal = catchAnimal();
        res.json(animal);   
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }   
});

animalRouter.post('/', async (req, res) => {
    try{
        const animal = req.body.animal;
        const data = await updateCountAnimal(animal);
        res.json(data);
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
    
});

animalRouter.get('/combine', async (req, res) => {
    try{
        const data = await handleCombine();
        res.json(data);
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
});
export default animalRouter;