import cheerio from "cheerio";
import chromium from "chrome-aws-lambda";
import path from 'path'
import { urls } from "../assets/urls.js";
const downloadPath = path.resolve('./download');

export const getAnimeEpisodes = async (req, res) => {
    const anime = "sword-art-online"
    const url = `${urls.animeUrl}${anime}`;
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    const episodes = [];
    const episode = await page.$$('.anime__item');
    for (const episodeHandle of episode) {
        const single = await page.evaluate(el => el.getAttribute('href'), episodeHandle)
        if (single !== null) {
            episodes.push(single)
        }
    }
    if (episodes.length<13) {
     await page.click('.numbers')
     for (const episodeHandle of episode) {
        const single = await page.evaluate(el => el.getAttribute('href'), episodeHandle)
        if (single !== null) {
            episodes.push(single)
        }
    }   
    }
    res.send(episodes)
    await browser.close()
}
export const getAnimeLink = async (req, res) => {
    const anime = req.params.anime
    const episode = req.params.ep
    const url = `${urls.watchUrl}${anime}/${episode}`
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    const elementHandle = await page.$('.player_conte')
    const frame = await elementHandle.contentFrame();
    const video = frame.url()
    await browser.close()
    res.send(video);
}

export const getDowloadLink = async (req, res) => {
    const anime = req.params.anime
    const episode = req.params.ep
    const url = `${urls.downloadUrl}${anime}-episodio-${episode}`
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const results = [];
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.downbtns')['0'].children[1].attribs.href;
    res.send(test)
}