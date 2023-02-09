import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gamesRouter from "./routes/GamesRouter.js";
import customersRouter from "./routes/CustomersRouter.js";

dotenv.config();


const server = express();
server.use(express.json());
server.use(cors());
server.use(gamesRouter);
server.use(customersRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));
