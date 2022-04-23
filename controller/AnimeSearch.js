import puppeteer from "puppeteer";
import cheerio from 'cheerio'
import { urls } from "../assets/urls.js";

export const searchAnime = async (req,res) => {
    const searchKey = req.params.anime;
    const url = `${urls.searchUrl}${searchKey}/1`;
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const results = [];
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.anime__item').find('.anime__item__pic.set-bg').each((index,value) => {
        results.push({imagen : value.attribs['data-setbg'],name : value.parent.parent.children[3].children[2].children[0].children[0].data,url : value.parent.parent.children[3].children[2].children[0].attribs.href})
    })
    await browser.close()
    res.send(results)
}