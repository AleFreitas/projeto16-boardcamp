import { getCustomers } from "../controller/Customers.js"
import { Router } from 'express'

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)

export default customersRouter