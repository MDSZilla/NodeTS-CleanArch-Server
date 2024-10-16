import express from 'express';
import * as http from "http";
import cors from "cors";
import bodyParser from 'body-parser';
import { router } from './router/router';
import { Server } from 'socket.io';
import 'dotenv/config';

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
        origin: ["http://localhost:3000", "https://www.heylove.tv", "https://heylove.tv"],
        methods: ["GET", "POST"],
        credentials: true,
    }, path: "/ws/streamanalytics-ms"
});

//Which PORT To deploy server on
const PORT = process.env.PORT || 3016;

type ChannelRooms = { [channelName: string]: Set<string> };

const channelRooms: ChannelRooms = {};

// Enable this for WebSocket Functionality
io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("INITIALIZE", (data: {channelName: string}) => {
        const channelName: string = data.channelName;

        socket.join(channelName);

        if(!channelRooms[channelName]){
            channelRooms[channelName] = new Set();
        };

        channelRooms[channelName].add(socket.id);
        // console.log(channelRooms[channelName].size);
        io.to(channelName).emit("VIEWCOUNT", channelRooms[channelName].size);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
        
        for(const room in channelRooms){
            if(channelRooms[room].has(socket.id)){
                channelRooms[room].delete(socket.id);
                io.to(room).emit("VIEWCOUNT", channelRooms[room].size);
            }
        };
    });

});

app.get('/', (req, res) => {
    res.write(`<h1>Stream Analytics is Server Running on Port : ${PORT}</h1>`);
    res.end();
});

// app.use("/api/v1", router);

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});