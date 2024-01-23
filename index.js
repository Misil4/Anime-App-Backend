
import http from 'http'
import Express from 'express'
import router from "./routes/routes.js";
import * as dotenv from 'dotenv'
import path from 'path';
import torrentStream from 'torrent-stream'
import { Server as socketIO } from 'socket.io';
import cors from 'cors';
import ffmpeg from "ffmpeg";
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
app.get('/stream/:infoHash', (req, res) => {
  const { infoHash } = req.params;
  const torrentPath = "./"

  const engine = torrentStream(`magnet:?xt=urn:btih:${infoHash}`, {
    path: torrentPath,
    uploads: 0,
    verify: true,
    dht: true,
    tracker: true,
  });

  engine.on('ready', () => {
    const file = engine.files[0];

    if (!file) {
      res.status(404).end('File not found');
      return;
    }

    const rangeHeader = req.headers.range || 'bytes=0-';
    const ranges = parseRangeHeader(rangeHeader, file.length);

    if (!ranges || ranges === -1) {
      res.status(416).end(); // Rango no satisfactorio
      return;
    }

    const range = ranges[0];

    // Configurar cabeceras de respuesta para el rango de bytes solicitado
    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
    res.setHeader('Content-Length', range.end - range.start + 1);
    res.setHeader('Content-Type', 'video/x-matroska'); // Cambia según sea necesario

    // Crear un flujo de lectura del archivo y enviar el rango solicitado al cliente
    const stream = file.createReadStream({ start: range.start, end: range.end });
    stream.pipe(res);
  });

  engine.on('error', (err) => {
    console.error('Torrent stream error:', err);
    res.status(500).end('Internal Server Error');
  });
});

function parseRangeHeader(rangeHeader, fileSize) {
  const ranges = rangeHeader.replace(/bytes=/, '').split('-');
  const start = parseInt(ranges[0], 10);
  const end = ranges[1] ? parseInt(ranges[1], 10) : fileSize - 1;

  if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
    return null;
  }

  return [{ start, end }];
}