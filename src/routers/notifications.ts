import express from 'express'
import { addNotification, deleteNotification, getNotifications } from '../controllers/notifications.controller'

export const notificationsRouter = express.Router()

notificationsRouter.get('/notifications', getNotifications)

notificationsRouter.post('/notifications', addNotification)

notificationsRouter.delete('/notifications/:id', deleteNotification)