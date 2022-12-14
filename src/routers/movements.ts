import express from 'express'
import { addMovement, getMovements } from '../controllers/movements.controller'

export const movementsRouter = express.Router()

movementsRouter.get('/movements', getMovements)

movementsRouter.post('/movements', addMovement)
