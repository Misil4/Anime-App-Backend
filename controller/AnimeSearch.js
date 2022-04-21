import puppeteer from "puppeteer";
import cheerio from 'cheerio'
import { urls } from "../assets/urls.js";

export const searchAnime = async (req,res) => {
    const searchKey = req.params.anime;
    const url = `${urls.searchUrl}${searchKey}`;
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const results = [];
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.row').find('.col-md-4.col-lg-2.col-6').each((index,value) => {
        results.push({imagen : value.children[1].children[1].children[1].children[1].attribs.src,name : value.children[1].children[1].children[3].children[1].children[0].data,url : value.children[1].attribs.href})
    })
    res.send(results)
}