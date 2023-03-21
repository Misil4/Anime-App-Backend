import axios from "axios";
import { urls } from "../assets/urls.js";
import cheerio from "cheerio";
import Humanoid from 'humanoid-js'
let humanoid = new Humanoid()
export const getlatestAnimeAdded = async (req, res) => {
  let anilist = []
  const data = await humanoid.get(urls.url); 
  const $ = cheerio.load(data.body)
  console.log(anilist)
  const test = $('.maximoaltura').find('.bloqq').each((index, value) => anilist.push({ image: value.children[0].children[1].children[1].attribs.src, name: value.children[0].children[3].children[1].children[0].data, episode: parseInt(value.children[0].children[3].children[3].children[0].data.replace(/\D/g, "")), url: value.attribs.href }))
  res.send(anilist)
};
export const getlatestSeriesAdded = async (req,res) => {
  let anilist = []
  const data = await humanoid.get(urls.url)
  const $ = cheerio.load(data.body)
  const test = $(".trending__anime").find(".col-lg-3.col-md-6.col-sm-6").each((index,value) => anilist.push({url : value.children[1].children[1].attribs.href,image : value.children[1].children[1].children[0].attribs['data-setbg'],estado : value.children[1].children[3].children[0].children[0].children[0].data,type : value.children[1].children[3].children[0].children[2].children[0].data,name : value.children[1].children[3].children[2].children[0].children[0].data}))
  res.send(anilist)
}
export const getcurrentSeriesAdded = async (req,res) => {
  let anilist = []
  const data = await humanoid.get(urls.currentUrl)
  const $ = cheerio.load(data.body)
  const test = $(".row.row-cols-md-3.custom_flex").find(".card.mb-3.custom_item2").each((index,value) => anilist.push({url : value.children[1].children[1].children[1].attribs.href,image : value.children[1].children[1].children[1].children[0].attribs.src,estado : value.children[1].children[3].children[1].children[5].children[0].children[0].data,type : value.children[1].children[3].children[1].children[5].children[1].children[0].data,name : value.children[1].children[1].children[1].children[0].attribs.alt}))
  res.send(anilist)
}