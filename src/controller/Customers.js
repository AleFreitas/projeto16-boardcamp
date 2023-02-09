import { db } from "../config/database.js";

export async function getCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers`);
        return res.send(customers.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const cpfTaken = await db.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf]);
        if(cpfTaken.rows.length !== 0){
            return res.sendStatus(409);
        }
        await db.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,[name, phone, cpf, birthday]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}