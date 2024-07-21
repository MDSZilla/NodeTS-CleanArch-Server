// This file serves the purpose to explain the purpose of the router folder and its working.

import { Router } from "express";
import { examplePOST } from "../../api/v1/example/POST/examplePOST";
import { exampleGET } from "../../api/v1/example/GET/exampleGET";

// #0. The router you create below should be imported and used in the router.ts file.


//#1. Export a router object that can be imported in the router.ts file. This provides the routing path for example.

//http://api.com/example/*

export const exampleRouter = Router();

//#2. Create a Route using .use, .post, .get, etc.
//This route will now be accessible as an API route
//http://api.com/example/examplePOST

//Example Route
exampleRouter.use("/examplePOST", examplePOST);
exampleRouter.use("/exampleGET", exampleGET);
//the examplePOST, is an API Function, meaning the function that will process the incoming request and return a response

