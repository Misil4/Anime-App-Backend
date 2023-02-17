import db from "../database/database.js";
import { getAllUsers, createNewUser, getUser, updateImage } from "../models/usersModel.js";

const getUsers = (req, res, next) => {
  var params = []
  db.all(getAllUsers(), params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("QUERY")
    res.json({
      rows
    })
  });
}
const getUser = (req, res, next) => {
  var params = []
  db.all(getAllUsers(), params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("QUERY")
    res.json({
      rows
    })
  });
}

const createUser = (req, res, next) => {

  var params = []
  db.all(createNewUser(req.body), params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("QUERY")
    res.json({
      "message": "success",
      "data": rows
    })
  });
}

const getLoginUser = (req, res, next) => {

  var params = []
  db.all(getUser(req.body), params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("QUERY")
    res.json({
      "message": "success",
      "data": rows
    })
  });
}

const updateAvatar = (req, res, next) => {

  var params = []
  db.all(updateImage(req.body), params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("QUERY")
    res.json({
      "message": "success",
      "data": rows
    })
  });
}

export { getUsers, createUser, getLoginUser,updateAvatar }