
import http from 'http'
import Express from 'express'
import router from "./routes/routes.js";
import * as dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()
const app = Express();
const server = http.createServer(app)
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log('server started and listening on port ' + port);
});
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use(router);
