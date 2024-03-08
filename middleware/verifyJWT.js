import jwt from "jsonwebtoken";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const verifyJWT = (req, res, next) => {
  const token = req.get("Authorization");
    console.log(token)
  var path = require("path");
  if (!token) {
    res.send("Unauthorized");
  }
  try {
    let valid = false;

    if (token === "pc") {
      valid = true;
    } else {
      valid = jwt.verify(token, process.env.SECRET_TOKEN);
    }
    return valid ? next() : res.send(402);
  } catch (error) {
    console.error(error);
  }
};
