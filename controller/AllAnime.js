import cheerio from "cheerio";
import chromium from "chrome-aws-lambda";
import path from 'path'
import { urls } from "../assets/urls.js";
const downloadPath = path.resolve('./download');

export const getAnimeEpisodes = async (req, res) => {
    const anime = req.params.anime
    const sub = "sub-espanol"
    const url = `${urls.animeUrl}${anime}-${sub}`;
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto(url);
    const episodes = [];
    // let info = {}
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
     const info = {score : $('.col-lg-12.col-md-9').find('.chapterpic')['0'].children[3].children[0].data,portada : $('.heroarea').find('.heromain')['0'].children[1].children[0].attribs.src,estado : $(".butns").find("#btninfo")['0'].children[0].data,descripcion : $(".chapterdetails").find(".textComplete")['0'].children[0].data}
    const test = $('.allanimes').find('.col-item').each((index, value) => episodes.push({ enlace: value.children[1].attribs.href, imagen: value.children[1].children[1].children[1].children[1].attribs.src }))
    await browser.close()
    res.send({info,episodes})
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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
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
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    await page.goto(url);
    const results = [];
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    const $ = cheerio.load(data)
    const test = $('.downbtns')['0'].children[1].attribs.href;
    await browser.close()
    res.send(test)
}