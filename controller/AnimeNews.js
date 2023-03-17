process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
 import { urls } from "../assets/urls.js";
 import cheerio from "cheerio";
import Humanoid from "humanoid-js";
let humanoid = new Humanoid
 const getAnimeNews = async (req,res) => {
   const data = await humanoid.get(urls.newsUrl)
   console.log(data)
    const $ = cheerio.load(data.body)
    const newsArr = []
     const test = $(".featured-multi-sub.left.relative").each((index,value) => newsArr.push({title : value.children[1].children[3].children[1].children[0].data,url : value.children[1].attribs.href,image : value.children[1].children[1].children[1].attribs['data-lazy-src']}))
    res.send(newsArr)
 }

 export default getAnimeNews