import * as jwt from "jsonwebtoken";

export enum JWTExpiration{
    MIN = "m",
    HOUR = "h",
    DAY = "d",
    YEAR = "y",
    NEVER = "",
};

export function signJWT(payload: any){
    let encodedJWT;
    encodedJWT = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
    return encodedJWT;
};