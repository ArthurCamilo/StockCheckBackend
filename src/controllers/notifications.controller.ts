import { Request, Response } from 'express';
import { Notification, NotificationInput } from '../models/notification.model';


const getNotifications = async (req: Request, res: Response) => {
    const notifications = await Notification.find().exec();
    return res.status(200).json({ data: notifications });
};

const addNotification = async (req: Request, res: Response) => {
    const notificationInput = req.body as NotificationInput;
    const notificationCreated = Notification.create(notificationInput);
    return res.status(201).json({ data: notificationCreated });
};

const deleteNotification = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Notification.findByIdAndDelete(id);
  
    return res.status(200).json({ message: 'Notification deleted successfully.' });
};

export {
    getNotifications,
    addNotification,
    deleteNotification,
}