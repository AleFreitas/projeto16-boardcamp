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
    const { customerId, gameId, daysRented } = req.body;
    const date = new Date();
    try {
        const customerExists = await db.query(`
            SELECT * FROM customers WHERE id = $1
        `, [customerId]);
        if (customerExists.rows.length === 0) {
            return res.sendStatus(400);
        }
        const gameExists = await db.query(`
            SELECT * FROM games WHERE id = $1
        `, [gameId]);
        if (gameExists.rows.length === 0) {
            return res.sendStatus(400);
        }
        if (daysRented <= 0) {
            return res.sendStatus(400);
        }
        const originalPrice = daysRented * gameExists.rows[0].pricePerDay;

        const openRentals = await db.query(`
            Select * from rentals where "gameId"=$1 and "returnDate" is null
        `, [gameId]);
        //insuficient stock
        if (openRentals.rows.length >= gameExists.rows[0].stockTotal) {
            return res.sendStatus(400);
        }
        await db.query(`
            INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice") 
            VALUES ($1,$2,$3,$4,$5)
        `, [customerId, gameId, date, daysRented, originalPrice]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;
    const date = new Date();
    try {
        const rental = await db.query(`
            Select * from rentals where id=$1
        `, [id]);
        const game = await db.query(`
            Select games.* FROM rentals 
            JOIN games ON rentals."gameId" = games.id 
            WHERE rentals.id=$1;
        `, [id])
        if (rental.rows.length === 0) {
            return res.sendStatus(404)
        }
        if (game.rows.length === 0) {
            return res.status(500).send("the game for this rental has been removed from the database");
        }
        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400)
        }
        const daysDifference = Math.trunc((new Date(date) - new Date(rental.rows[0].rentDate)) / (1000 * 60 * 60 * 24));
        let delayFee = 0
        if(daysDifference-rental.rows[0].daysRented >= 0){
            delayFee = (daysDifference-rental.rows[0].daysRented) * game.rows[0].pricePerDay;
        }
        await db.query(`
            UPDATE rentals SET "returnDate"=$1,"delayFee"=$2 
            WHERE id = $3;
        `, [date, delayFee, id])
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteRental(req, res) {
    console.log(new Date())
    const { id } = req.params;
    try {
        const rental = await db.query(`
            Select * from rentals where id=$1
        `, [id]);
        console.log(rental.rows)
        if(rental.rows.length === 0){
            return res.sendStatus(404)
        }
        if(rental.rows[0].returnDate === null){
            return res.sendStatus(400)
        }
        await db.query(
            `DELETE FROM rentals WHERE id=$1
        `,[id]);
        return res.sendStatus(200)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}