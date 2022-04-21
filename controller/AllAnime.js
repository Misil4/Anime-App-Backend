import cheerio from "cheerio";
import puppeteer from "puppeteer";
import axios from "axios";
import path from 'path'
import { urls } from "../assets/urls.js";
const downloadPath = path.resolve('./download');

export const getAnimeEpisodes = async (req, res) => {
    try {
        const anime = req.params.anime
        const sub = "-sub-espanol"
        const url = `${urls.animeUrl}${anime}${sub}/`;
        const data = await axios.get(url);
        const $ = cheerio.load(data.data);
        let episodes = [];
        const test = $('.row.jpage.row-cols-md-6').find('.col-item').each((index, value) => episodes.push({ enlace: value.children[1].attribs.href, imagen: value.children[1].children[1].children[1].children[1].attribs['data-src'] }))
        res.send(episodes)
    } catch (error) {
        res.send(error)
    }
}
export const getAnimeLink = async (req, res) => {
    const anime = req.params.anime
    const episode = req.params.ep
    const url = `${urls.watchUrl}${anime}/${episode}`
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const elementHandle = await page.$('.player_conte')
    const frame = await elementHandle.contentFrame();
    const video = frame.url()
    res.send(video);
}

export const getDowloadLink = async (req, res) => {
    const anime = req.params.anime
    const episode = req.params.ep
    const url = `${urls.downloadUrl}${anime}-episodio-${episode}`
    const data = await axios.get(url);
    const $ = cheerio.load(data.data);
    const test = $('.downbtns')['0'].children[1].attribs.href;
    res.send(test)
}