import db from "../database/database.js";
import {getAllUsers,createNewUser} from "../models/usersModel.js";

const getUsers = (req,res,next) => {
    var params = []
    db.run(getAllUsers(),params ,(err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log("QUERY")
        res.json({
            rows
        })
      });
    }
const createUser = (req,res,next) => {

  var params = []
  db.run(createNewUser(req.body),params ,(err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    console.log("QUERY")
    res.json({
        "message":"success",
        "data":rows
    })
  });
}

    export {getUsers,createUser}