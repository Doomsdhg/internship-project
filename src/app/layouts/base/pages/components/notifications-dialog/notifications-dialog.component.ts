import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
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

  private loadNotifications(): void {
    this.notificationsApiService.getNotifications()
    .subscribe((response: NotificationsListResponse) => {
      this.notificationsArray = response.notifications;
      this.changeDetectorRef.detectChanges();
    })
  }
}
