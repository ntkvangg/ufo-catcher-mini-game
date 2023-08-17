import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import animalRouter from './router/animalRouter.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://ufo-catcher-mini-game.vercel.app", "http://localhost:3000"],
        methods: ["GET", "POST"], 
    }
});

io.on("connection", (socket)=>{
    socket.on("catch-animal-success", (data)=>{
        socket.broadcast.emit("receive-catch-animal", data);
    });
    socket.on("combine", (data)=>{
        socket.broadcast.emit('receive-combine', data);
    })
})

server.listen(port,()=>{
    console.log(`WebSocket server is running on port ${port}`);
})

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

app.use('/api/animals', animalRouter);

app.use('/', (req, res)=>{
    res.send('Server is ready');
})

app.use(errorHandler);