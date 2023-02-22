const api = require("animeflv-scrapper")
api.getAllAnimes().then((animes) =>console.log(animes)).catch((error) => console.error(error))