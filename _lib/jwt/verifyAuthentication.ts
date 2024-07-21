import { verifyJWT } from "../jwt/verifyJWT";

export async function verifyAuthentication(authHeader: string | undefined): Promise<boolean>{
    if(!authHeader){
        return false;
    } else {
        const token = authHeader.split(" ")[1];
        if(!token){
            return false;
        } else {
            const verifyToken = await verifyJWT(token);
            if(!verifyToken){
                return false;
            } else {
                return true;
            }
        };
    };
};