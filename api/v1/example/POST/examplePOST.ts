import { Request, Response } from "express";
import { verifyAuthentication } from "../../../../_lib/jwt/verifyAuthentication";


export async function examplePOST(request: Request, response: Response){
    if(request.method === "POST"){
        //Read Auth Header
        const authHeader = request.headers.authorization;
        if(!verifyAuthentication(authHeader)){ //Check if Authorization header is valid and token is not expired
            response.cookie(process.env.AUTH_COOKIE_NAME!, "", { expires: new Date(0) }); //Clear Cookie
            //Return Response
            // return response.status(401).send(new ServerResponse<CreateSpinOutputDTO>(new CreateSpinOutputDTO(), ServerResponseStatus.CLIENTERROR, "Unauthorized Access"));
        };

        //Perform your Operations
        
    } else { //If Request Method is Invalid
        return response.status(405).send("Method not allowed");
    };
};