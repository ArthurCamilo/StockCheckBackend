import express from 'express'
import { addVendor, deleteVendor, editVendor, getVendors } from '../controllers/vendors.controller'

export const vendorsRouter = express.Router()

vendorsRouter.get('/vendors', getVendors)

vendorsRouter.post('/vendors', addVendor)

vendorsRouter.put('/vendors/:id', editVendor)

vendorsRouter.delete('/vendors/:id', deleteVendor)