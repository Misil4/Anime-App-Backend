
import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";
import { urls } from "../assets/urls.js";
import cheerio from "cheerio";
export const getlatestAnimeAdded = async (req, res) => {
  const browser = await chromium.puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true, });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto(urls.url);
    await page.waitForSelector(".maximoaltura")
  let anilist = []
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);
  const $ = cheerio.load(data)
  console.log(anilist)
  const test = $('.maximoaltura').find('.bloqq').each((index, value) => anilist.push({ image: value.children[0].children[1].children[1].attribs.src, name: value.children[0].children[3].children[1].children[0].data, episode: parseInt(value.children[0].children[3].children[3].children[0].data.replace(/\D/g, "")), url: value.attribs.href }))
  await browser.close()
  res.send(anilist)
};