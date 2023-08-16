import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import animalRouter from './router/animalRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

function errorHandler(err, req, res, next) {
    console.error("Error:", err);
    const status = err.status || 500;
    const message = status !== 500 ? err.message : 'Internal server!'
    res.status(status).json({message, status });
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
app.use('/api/animals', animalRouter);

app.use('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(errorHandler);