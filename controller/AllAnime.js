import cheerio from "cheerio";
import puppeteer from "puppeteer";
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
    score: $(".col-lg-12.col-md-9").find(".chapterpic")["0"].children[3]
      .children[0].data,
    portada:
      $(".heroarea").find(".heromain")["0"].children[1].children[0].attribs.src,
    estado: $(".butns").find("#btninfo")["0"].children[0].data,
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
  const limit = Math.round(episodes.length / 20);
  const startIndex = (page - 1) * 20;
  const endIndex = page * 20;
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
  const anime = req.params.anime;
  const episode = req.params.ep;
  const url = `${urls.downloadUrl}${anime}-episodio-${episode}`;
  const browser = await puppeteer.launch({
    args: ["--hide-scrollbars", "--disable-web-security", "--no-sandbox"],
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  );
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const botones = await page.$$("#play-video");
  const attrs = [];
  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    await boton.click();
    const attr = await page.$eval("#videoLoading", (el) =>
      el.getAttribute("data-video")
    );
    attrs.push(atob(attr));
  }
  await browser.close();
  res.send(attrs);
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
