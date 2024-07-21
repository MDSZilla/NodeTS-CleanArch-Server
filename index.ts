import express from 'express';
import * as http from "http";
import cors from "cors";
import bodyParser from 'body-parser';
import { router } from './router/router';
import { Server } from 'socket.io';

const cookieParser = require("cookie-parser"); //Cookie Parser is required to parse and process Cookies

const app = express(); //Creating an Express Object to be used

//Set up CORS Policy
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

//Middlewares to Use in the Server
app.use(bodyParser.json());
app.use(cookieParser());

//Create a http Server using the Express Object
const server = http.createServer(app);

//Create a WS Socket Server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

//Which PORT To deploy server on
const PORT = 3001;


io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
});

app.get('/', (req, res) => {
    res.write(`<h1>Server Running on Port : ${PORT}</h1>`);
    res.end();
});

app.use("/api/v1", router);

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});