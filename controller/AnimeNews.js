 import puppeteer from "puppeteer";
 import chromium from "chrome-aws-lambda";
 import { urls } from "../assets/urls.js";
 import cheerio from "cheerio";
 
 const getAnimeNews = async (req,res) => {
    const browser = await puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true, });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto(urls.newsUrl);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const newsArr = []
    const test = $(".news-list.dg.gg1.gt1.xs-gt2.md-gt3.xl-gt4.xl-gg2").find(".ar.por").each((index,value) => newsArr.push({type : value.children[1].children[1].children[0].data,title : value.children[1].children[3].children[0].data,url : value.children[5].attribs.href,image : value.children[3].children[1].attribs.src}))
    await browser.close()
    res.send(newsArr)
 }

 export default getAnimeNews