import * as jwt from "jsonwebtoken";

export async function decodeJWT(token: string){
    const decodedJWT = jwt.decode(token);
    return decodedJWT;
}