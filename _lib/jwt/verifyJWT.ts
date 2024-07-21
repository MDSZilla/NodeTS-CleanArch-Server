import * as jwt from "jsonwebtoken";

export async function verifyJWT(token: string){
    return jwt.verify(token, process.env.JWT_SECRET!);
};