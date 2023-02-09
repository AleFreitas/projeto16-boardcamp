import { db } from "../config/database.js";

export async function getGames(req, res) {
    const { id } = req.params;
    try {
        const receita = await db.query(`SELECT * FROM games`);
        res.send(receita.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}