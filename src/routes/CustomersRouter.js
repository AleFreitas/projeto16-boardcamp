import { getCustomers, postCustomer, getCustomer} from "../controller/Customers.js"
import { Router } from 'express'

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomer)
customersRouter.post("/customers", postCustomer)
export default customersRouter