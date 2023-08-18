import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? "https://ufo-catcher-mini-game-backend.vercel.app" : 'http://localhost:5000';

export const socket = io(URL, {
    path: '/api/socket'
});