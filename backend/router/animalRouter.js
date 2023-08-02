import express from 'express';
import Animal from '../model/animalModel.js';
import {catchAnimal, updateCountAnimal, handleCombine}  from '../controller/animalController.js';
import Diamond from '../model/diamondModel.js';

const animalRouter = express.Router();

animalRouter.get('/', async (req, res) => {
    try {
        // Find the first document (if it exists) in the Animal collection
        const animalDoc = await Animal.findOne({}).exec();
        // If there's no document, create a new one with default values
        if (!animalDoc) {
          const newAnimal = new Animal();
          console.log(newAnimal, 'newAnimal');
          await newAnimal.save({ timestamps: { createdAt: false, updatedAt: false } });
          return res.json(newAnimal.toObject());
        }
        // Respond with the animal counts from the existing document
        res.json(animalDoc.toObject());
      } catch (error) {
        console.error("Error handling /animals request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

animalRouter.get('/catch', (req, res) => {
    try{
        const animal = catchAnimal();
        res.json(animal);   
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
});

animalRouter.post('/', async (req, res) => {
    try{
        const animal = req.body.animal;
        const data = await updateCountAnimal(animal);
        res.json(data);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
});

animalRouter.get('/combine', async (req, res, next) => {
    try {
        const data = await handleCombine();
        if(data.success){
          const diamondDoc = await Diamond.findOne({}).exec();
          let diamondCount = diamondDoc.toObject();
          if(!diamondDoc){
            const newDiamond = new Diamond();
            await newDiamond.save();
            diamondCount = newDiamond.toObject();
          }
          diamondCount.total += 1;
          Diamond.findOneAndUpdate({}, {'total': diamondCount.total})
        }
        res.json(data);
      } catch (error) {
        if (error.status === 403) {
          res.status(403).json({ message: error.message, status: 403 });
        } else {
          res.status(500).json({ message: "Internal server error", status: 500 });
        }
    }
});

animalRouter.get('/diamonds', async (req, res)=>{
    try{
      const diamondDoc = await Diamond.findOne({}).exec();
      if(!diamondDoc){
        const newDiamond = new Diamond();
        await newDiamond.save();
        return res.json(newDiamond.toObject());
      }
      res.json(diamondDoc.toObject());
    }catch(error){
        res.status(500).json("Server error");
    }
})
export default animalRouter;