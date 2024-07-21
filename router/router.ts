// This file is used as an interface/abstract to all the routes.
import { Router } from "express";
import { exampleRouter } from "./example/route";

//Export a Router that can be used in the server.ts / index.ts file
export const router = Router();

//Example Router (This will enable us to access an API route /example/*)
router.use("/example", exampleRouter);
