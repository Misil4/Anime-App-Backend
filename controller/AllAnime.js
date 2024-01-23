import cheerio from "cheerio";
import { si } from 'nyaapi'
import Humanoid from "humanoid-js";
import { urls } from "../assets/urls.js";
let humanoid = new Humanoid();
export const getAnimeEpisodes = async (req, res) => {
  const anime = req.params.anime;
  const sub = "sub-espanol";
  const url = `${urls.animeUrl}${anime}-${sub}`;
  const page = parseInt(req.params.page);
  const results = {};
  const episodes = [];
  // let info = {}
  const data = await humanoid.get(url);
  const $ = cheerio.load(data.body);
  const info = {
    // score: $(".col-lg-12.col-md-9").find(".chapterpic")["0"].children[3]
    //   .children[0]?.data,
    portada:
      $(".heroarea").find(".heromain")["0"].children[1].children[0].attribs.src,
    estado: $(".butns").find("#btninfo")["0"].children[0]?.data,
    descripcion:
      $(".chapterdetails").find(".textComplete")["0"].children[0].data,
  };
  const test = $(".allanimes")
    .find(".col-item")
    .each((index, value) =>
      episodes.push({
        enlace: value.children[1].attribs.href,
        imagen:
          value.children[1].children[1].children[1].children[1].attribs.src,
      })
    );
  const limit = Math.round(episodes.length / 30);
  const startIndex = (page - 1) * 30;
  const endIndex = page * 30;
  if (endIndex < episodes.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  res.send({
    info,
    episodes: episodes.slice(startIndex, endIndex),
    pages: limit,
  });
};
export const getAnimeLink = async (req, res) => {
  const episode = req.params.ep > 9 ? req.params.ep : "0" + req.params.ep
  const anime = await si.search(`[Erai-raws] ${req.params.anime.charAt(0).toUpperCase() + req.params.anime.slice(1)} - ${episode} [1080p]`)
  const expresionRegular = /\[Erai-raws\]\s+(.*?)-\s+(\d+)\s+\[1080p]/;
  if (anime.length > 0) {
    res.send(JSON.stringify(anime.filter(elemento => {
      const coincidencias = elemento.name.match(expresionRegular);
      if (coincidencias) {
        const textoDesired = coincidencias[1].trim();
        const episodioDesired = coincidencias[2].trim();
        return textoDesired === req.params.anime.charAt(0).toUpperCase() + req.params.anime.slice(1) && episodioDesired === episode;
      }
      return false;
    })))
  }
  else {
    res.status(400).send("no results found")
  }
};

export const getDowloadLink = async (req, res) => {
  const anime = req.params.anime;
  const episode = req.params.ep;
  const url = `${urls.downloadUrl}${anime}-episodio-${episode}`;
  const data = await humanoid.get(url);
  const $ = cheerio.load(data.body);
  const test = $(".downbtns")["0"].children.find((item) =>
    item.attribs?.href.includes("mega")
  )
    ? $(".downbtns")["0"].children.find((item) =>
      item.attribs?.href.includes("mega")
    ).attribs.href
    : "0";
  res.send(test);
};
