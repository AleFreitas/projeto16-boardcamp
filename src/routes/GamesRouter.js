import { getGames } from "../controller/Games.js" 
import { Router } from 'express'

const gamesRouter = Router()

gamesRouter.get("/games", getGames)

export default gamesRouter