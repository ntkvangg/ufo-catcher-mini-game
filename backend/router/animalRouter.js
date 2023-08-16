import express from 'express';
import Animal from '../model/animalModel.js';
import {catchAnimal, handleCombine}  from '../controller/animalController.js';
import Diamond from '../model/diamondModel.js';

const animalRouter = express.Router();

animalRouter.get('/', async (req, res, next) => {
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
        next(error);
    }
});

animalRouter.get('/catch/:count', async(req, res, next) => {
    try{
        const animalObj = await catchAnimal(req.params?.count || 1);
        res.json(animalObj);   
    }catch(error){
        next(error);
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
          Diamond.findOneAndUpdate({}, {'total': diamondCount.total}).exec();
        }
        res.json(data);
      } catch (error) {
        next(error);
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
        next(error);
    }
})
export default animalRouter;