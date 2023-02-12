import { db } from "../config/database.js";

export async function getGames(req, res) {
    const name = req.query.name+"%";
    if(typeof name !== "undefined" ){
        const gamesFilter = await db.query(`
            SELECT * FROM games
            WHERE LOWER(name) LIKE LOWER($1)
        `,[name]);
        return res.send(gamesFilter.rows);
    }
    try {
        const games = await db.query(`SELECT * FROM games`);
        return res.send(games.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postGame(req, res) {
    const { name,image,stockTotal,pricePerDay } = req.body;
    try {
        const nameTaken = await db.query(`SELECT * FROM games WHERE name = $1`,[name]);
        if(nameTaken.rows.length !== 0){
            return res.sendStatus(409);
        }
        await db.query(`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)`,[name,image,stockTotal,pricePerDay]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}