import { Router } from 'express';
import { getCustomers, postCustomer, getCustomer, updateCustomer} from "../controller/Customers.js";
import { validateSchema } from '../middleware/validateSchema.js';
import { CustomerSchema } from '../schema/CustomerSchema.js';

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateSchema(CustomerSchema), postCustomer);
customersRouter.put("/customers/:id", validateSchema(CustomerSchema), updateCustomer);
export default customersRouter;