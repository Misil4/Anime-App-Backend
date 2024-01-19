import express from "express";
import { searchAnime } from "../controller/AnimeSearch.js";
import { getcurrentSeriesAdded, getlatestAnimeAdded, getlatestSeriesAdded } from "../controller/SeasonalAnime.js";
import { getAnimeEpisodes,getAnimeLink, getDowloadLink,streamEpisode } from "../controller/AllAnime.js";
import getAnimeNews from "../controller/AnimeNews.js";
import { getUsers,createUser, getLoginUser, updateAvatar } from "../controller/userController.js";
import { createJWT, createNewJWT } from "../services/jwt.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router()

{/* JWT */}
router.post('/token/',createJWT)
router.post('/refresh/',createNewJWT)

// Last Animes
router.get("/lastAnime",verifyJWT,getlatestAnimeAdded)
// Last Anime series
router.get("/lastAnimeSeries",verifyJWT,getlatestSeriesAdded)
// Last Current series
router.get("/lastCurrentSeries",verifyJWT,getcurrentSeriesAdded)
// Last Anime News
router.get("/lastAnimeNews",verifyJWT,getAnimeNews)
// Get episode from anime name
router.get("/episodes/:anime/:page",verifyJWT,getAnimeEpisodes)
// Get anime info from anime name
router.get("/search/:anime",verifyJWT,searchAnime)
// Get anime ep view link
router.get("/url/:anime/:ep",verifyJWT,getAnimeLink)
// Get anime dowload link
router.get("/dowload/:anime/:ep",verifyJWT,getDowloadLink)

router.get("/ver/:magnet",streamEpisode)

router.get("/users",verifyJWT,getUsers)

router.post("/create",verifyJWT,createUser)

router.post("/login",verifyJWT,getLoginUser)

router.post("/avatar",verifyJWT,updateAvatar)

export default router