import jwt from 'jsonwebtoken'
import { createRequire } from "module";
const require = createRequire(import.meta.url);



export const verifyJWT = (req, res, next) => {
    console.log(1)
    const token = req.get('Authorization')
    var path = require('path');
    if (!token) {
        res.send("Unauthorized");
    }
    try {
        const valid = jwt.verify(token, process.env.SECRET_TOKEN)
        return valid ? next() : res.send(402)
    } catch (error) {
        console.error(error)
    }
}
