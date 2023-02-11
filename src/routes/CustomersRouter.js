import { Router } from 'express'
import { getCustomers, postCustomer, getCustomer} from "../controller/Customers.js"
import { validateSchema } from '../middleware/validateSchema.js'
import { CostumerSchema } from '../schema/CustomerSchema.js'

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomer)
customersRouter.post("/customers", validateSchema(CostumerSchema),postCustomer)
export default customersRouter