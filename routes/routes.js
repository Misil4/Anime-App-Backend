import express from "express";
import { searchAnime } from "../controller/AnimeSearch.js";
import { getlatestAnimeAdded, getlatestSeriesAdded } from "../controller/SeasonalAnime.js";
import { getAnimeEpisodes,getAnimeLink, getDowloadLink } from "../controller/AllAnime.js";
import getAnimeNews from "../controller/AnimeNews.js";
import { getUsers,createUser, getLoginUser, updateAvatar } from "../controller/userController.js";
const router = express.Router()


// Last Animes
router.get("/lastAnime",getlatestAnimeAdded)
// Last Anime series
router.get("/lastAnimeSeries",getlatestSeriesAdded)
// Last Anime News
router.get("/lastAnimeNews",getAnimeNews)
// Get episode from anime name
router.get("/episodes/:anime",getAnimeEpisodes)
// Get anime info from anime name
router.get("/search/:anime",searchAnime)
// Get anime ep view link
router.get("/url/:anime/:ep",getAnimeLink)
// Get anime dowload link
router.get("/dowload/:anime/:ep",getDowloadLink)

router.get("/users",getUsers)

router.post("/create",createUser)

router.post("/login",getLoginUser)

router.post("/avatar",updateAvatar)

export default router