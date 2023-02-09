import { getGames, postGame } from "../controller/Games.js" 
import { Router } from 'express'

const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", postGame)

export default gamesRouter