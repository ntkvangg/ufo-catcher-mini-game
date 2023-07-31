import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import animalRouter from './router/animalRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(cors());

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
app.use('/api/animals', animalRouter);

app.use('/', (req, res)=>{
    res.send('Server is ready');
})