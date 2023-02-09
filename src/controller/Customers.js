import { db } from "../config/database.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers`);
        return res.send(customers.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
