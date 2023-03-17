import axios from "axios";
import { urls } from "../assets/urls.js";
import cheerio from "cheerio";
import Humanoid from 'humanoid-js'
export const getlatestAnimeAdded = async (req, res) => {
  let humanoid = new Humanoid()
  let anilist = []
  const data = await humanoid.get(urls.url); 
  const $ = cheerio.load(data.body)
  console.log(anilist)
  const test = $('.maximoaltura').find('.bloqq').each((index, value) => anilist.push({ image: value.children[0].children[1].children[1].attribs.src, name: value.children[0].children[3].children[1].children[0].data, episode: parseInt(value.children[0].children[3].children[3].children[0].data.replace(/\D/g, "")), url: value.attribs.href }))
  res.send(anilist)
};