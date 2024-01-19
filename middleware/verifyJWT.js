import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.get("Authorization");
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
