import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? "wss://ufo-catcher-mini-game-backend.vercel.app/api/socket" : 'http://localhost:5000';

export const socket = io(URL, {
    withCredentials: true
});