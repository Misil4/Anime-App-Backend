import admin from "firebase-admin";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config()
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
  }),
});
const verifyToken = async (token) => {
  const decoded = await admin.auth().verifyIdToken(token, true);
  return decoded ? true : false;
};

const generateAccessToken = (email) => {
  return jsonwebtoken.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
const generateRefreshToken = (email) => {
  return jsonwebtoken.sign({ email }, process.env.SECRET_TOKEN_REFRESH);
};
export const createJWT = async (req, res) => {
  const {token,email} = req.body
  admin
    .auth()
    .verifyIdToken(token, true)
    .then((response) => {
      res.send({
        data: {
          access_token: generateAccessToken(email),
          refresh_token: generateRefreshToken(email),
        },
      });
    })
    .catch((error) => {
      console.error(error);
      res.send(401);
    });
};

export const createNewJWT = async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;
  try {
    let valid = jsonwebtoken.verify(token, process.env.SECRET_TOKEN_REFRESH);
    if (valid) {
      res.send({
        data: {
          access_token: generateAccessToken(email),
          refresh_token: generateRefreshToken(email),
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.send(401);
  }
};
