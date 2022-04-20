import cheerio from "cheerio";
import axios from "axios";
import { urls } from "../assets/urls.js";

export const searchAnime = async (req,res) => {
    const searchKey = req.params.anime;
    const url = `${urls.searchUrl}${searchKey}`;
    const data = await axios.get(url);
    const results = [];
    const $ = cheerio.load(data.data)
    const test = $('.row').find('.col-md-4.col-lg-2.col-6').each((index,value) => {
        results.push({imagen : value.children[1].children[1].children[1].children[1].attribs.src,name : value.children[1].children[1].children[3].children[1].children[0].data,url : value.children[1].attribs.href})
    })
    res.send(results)
}