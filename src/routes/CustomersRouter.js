import { getCustomers, postCustomer } from "../controller/Customers.js"
import { Router } from 'express'

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.post("/customers", postCustomer)
export default customersRouter