import * as bcrypt from "bcrypt";

export async function compareHash(hashedValue: string, originalValue: string){
    return await bcrypt.compare(originalValue, hashedValue);
};