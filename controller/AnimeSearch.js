import chromium from 'chrome-aws-lambda';
import cheerio from 'cheerio'
import { urls } from "../assets/urls.js";

export const searchAnime = async (req,res) => {
    const searchKey = req.params.anime;
    const url = `${urls.searchUrl}${searchKey}`;
    const browser = await chromium.puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true, });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto(url);
    const results = [];
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.row').find('.col-md-4.col-lg-2.col-6').each((index,value) => {
        results.push({imagen : value.children[1].children[1].children[1].children[1].attribs.src,name : value.children[1].children[1].children[3].children[1].children[0].data,url : value.children[1].attribs.href})
    })
    await browser.close()
    res.send(results)
}