
import cheerio from "cheerio";
import { urls } from "../assets/urls.js";
import axios from "axios";
export const getlatestAnimeAdded = async (req, res) => {
  const data = await axios.get(urls.url)
  const $ = cheerio.load(data.data)
  let anilist = []
  const test = $('.row.row-cols-5').find('.col.col-md-6.col-lg-2.col-6').each((index, value) => anilist.push(value.children[1].attribs))
  res.send(anilist)
};