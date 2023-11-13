import jwt from "jsonwebtoken"
import crypto from "crypto"


// generate token
const generateToken =(id)=>{
    // Sign the payload (in this case, the user ID) using JWT and the JWT_SECRET environment variable
    // Set the token to expire in 1 day
    return jwt.sign({id}, process.env.JWT_SECRET||"", {expiresIn:"1d"})
}

//hash token
const hashToken =(token)=>{
    // Create a SHA256 hash of the token by converting it to a string and digesting it in hexadecimal format
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

export { generateToken, hashToken};