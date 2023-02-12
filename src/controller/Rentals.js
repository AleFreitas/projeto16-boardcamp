import { db } from "../config/database.js";

export async function getRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT rentals.*,json_build_object('id',customers.id,'name',customers.name) as "customer" ,
        json_build_object('id',games.id,'name',games.name) as "game" 
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games on rentals."gameId" = games.id;
        `);
        return res.send(rentals.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postRental(req, res) {
    const { customerId,gameId,daysRented } = req.body;
    try {
        const customerExists = await db.query(`SELECT * FROM customers WHERE id = $1`,[customerId]);
        if(customerExists.rows.length === 0){
            return res.sendStatus(400);
        }
        const gameExists = await db.query(`SELECT * FROM games WHERE id = $1`,[gameId]);
        if(gameExists.rows.length === 0){
            return res.sendStatus(400);
        }
        if(daysRented <= 0){
            return res.sendStatus(400);
        }
        await db.query(`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)`,[name,image,stockTotal,pricePerDay]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}