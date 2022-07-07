import { NotificationDto } from '../../pages/components/notifications-dialog/notifications-dialog.interfaces';

export class NotificationsReplenishRequest {

    public notifications: NotificationDto[];

    public id: string;

    constructor(notificationsArray: NotificationDto[], userId: string) {
      this.notifications = notificationsArray;
      this.id = userId;
    }
  }
