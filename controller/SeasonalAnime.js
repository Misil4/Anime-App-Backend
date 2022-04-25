
import puppeteer from "puppeteer";
import chromium from "chrome-aws-lambda";
import { urls } from "../assets/urls.js";
export const getlatestAnimeAdded = async (req, res) => {
  const browser = await puppeteer.launch({args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath,
  headless: true,
  ignoreHTTPSErrors: true, });
  const page = await browser.newPage();
  await page.goto(urls.url);
  let anilist = []
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);
  const $ = cheerio.load(data)
  const test = $('.maximoaltura').find('.bloqq').each((index, value) => anilist.push({ image: value.children[0].children[1].children[1].attribs.src, name: value.children[0].children[3].children[1].children[0].data, episode: parseInt(value.children[0].children[3].children[3].children[0].data.substring(136, 137)), url: value.attribs.href }))
  await browser.close()
  res.send(anilist)
};