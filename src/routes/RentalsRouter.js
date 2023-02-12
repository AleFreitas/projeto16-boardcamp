import { Router } from 'express';
import { deleteRental, finishRental, getRentals, postRental } from "../controller/Rentals.js";
import { validateSchema } from '../middleware/validateSchema.js';
import { RentalsSchema } from '../schema/RentalsSchema.js';

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(RentalsSchema), postRental);
rentalsRouter.post("/rentals/:id/return", finishRental);
rentalsRouter.delete("/rentals/:id", deleteRental);
export default rentalsRouter;