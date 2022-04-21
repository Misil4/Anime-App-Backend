import express from "express";
import { searchAnime } from "../controller/AnimeSearch.js";
import { getlatestAnimeAdded } from "../controller/SeasonalAnime.js";
import { getAnimeEpisodes,getAnimeLink, getDowloadLink } from "../controller/AllAnime.js";
const router = express.Router()

router.get("/lastAnime",getlatestAnimeAdded
)
router.get("/episodes/:anime",getAnimeEpisodes)
router.get("/search/:anime",searchAnime)
router.get("/url/:anime/:ep",getAnimeLink)
router.get("/dowload/:anime/:ep",getDowloadLink)


export default router