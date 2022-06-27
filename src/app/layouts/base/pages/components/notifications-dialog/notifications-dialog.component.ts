import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
import { NotificationConstants } from './notification.constants';
import { NotificationDto, NotificationsListResponse } from './notifications-dialog.interfaces';
@Component({
  selector: 'intr-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsDialogComponent implements OnInit {

  public notificationsArray: NotificationDto[] = [];

  constructor(
    private notificationsApiService: NotificationsApiService,
    private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  public checkIfNotificationIsRead(notification: NotificationDto): boolean {
    return notification.isRead === NotificationConstants.TRUTHY_VALUE;
  }

  public pushChangesToServer(): void {
    this.notificationsApiService.updateServerData(this.notificationsArray)
    .subscribe();
  }

  public deleteNotification(index: number) {
    this.notificationsArray.splice(index, 1);
    this.pushChangesToServer();
  }

  public addNotification(): void {
    this.notificationsArray.push(this.notificationsArray[0]);
    this.pushChangesToServer();
  }

  public incrementNotViewedNotificationsAmount(): void {
    this.notificationsApiService.incrementUnseenNotificationsAmount()
    .subscribe()
  }

  private loadNotifications(): void {
    this.notificationsApiService.getNotifications()
    .subscribe((response: NotificationsListResponse) => {
      this.notificationsArray = response.notifications;
      this.changeDetectorRef.detectChanges();
    })
  }
}
