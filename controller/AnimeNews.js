 import puppeteer from "puppeteer";
 import chromium from "chrome-aws-lambda";
 import { urls } from "../assets/urls.js";
 import cheerio from "cheerio";
 
 const getAnimeNews = async (req,res) => {
   const browser = await chromium.puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true, });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
		'upgrade-insecure-requests': '1', 
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
		'accept-encoding': 'gzip, deflate, br', 
		'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
	}); 
    await page.goto(urls.newsUrl, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const newsArr = []
    const test = $(".news-list.dg.gg1.gt1.xs-gt2.md-gt3.xl-gt4.xl-gg2").find(".ar.por").each((index,value) => newsArr.push({type : value.children[1].children[1].children[0].data,title : value.children[1].children[3].children[0].data,url : value.children[5].attribs.href,image : value.children[3].children[1].attribs.src}))
    console.log(test)
    await browser.close()
    res.send(newsArr)
 }

 export default getAnimeNews