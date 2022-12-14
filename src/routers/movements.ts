import express from 'express'
import { addMovement, deleteMovement, editMovement, getMovements } from '../controllers/movements.controller'

export const movementsRouter = express.Router()

movementsRouter.get('/movements', getMovements)

movementsRouter.post('/movements', addMovement)

movementsRouter.put('/movements/:id', editMovement)

movementsRouter.delete('/movements/:id', deleteMovement)
