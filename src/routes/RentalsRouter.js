import { Router } from 'express'
import { getRentals, postRental } from "../controller/Rentals.js"
import { validateSchema } from '../middleware/validateSchema.js'
import { RentalsSchema } from '../schema/RentalsSchema.js'

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(RentalsSchema), postRental)
export default rentalsRouter