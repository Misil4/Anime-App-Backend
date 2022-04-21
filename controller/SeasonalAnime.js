import puppeteer from "puppeteer";
import cheerio from "cheerio";
import { urls } from "../assets/urls.js";
import axios from "axios";
export const getlatestAnimeAdded = async (req, res) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(urls.url);
    let anilist = []
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.row.row-cols-5').find('.col.col-md-6.col-lg-2.col-6').each((index, value) => anilist.push({name :value.children[1].attribs.alt,image : value.children[1].children[1].children[1].children[1].attribs['data-src'],episode:value.children[1].children[1].children[1].children[3].children[1].children[1].children[0].data,url : value.children[1].attribs.href}))
  res.send(anilist)
};