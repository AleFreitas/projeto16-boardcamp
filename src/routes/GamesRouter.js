import { Router } from 'express';
import { getGames, postGame } from "../controller/Games.js";
import { validateSchema } from '../middleware/validateSchema.js';
import { GamesSchema } from '../schema/GamesSchema.js';

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(GamesSchema), postGame);

export default gamesRouter;