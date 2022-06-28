import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError, finalize, map, pipe, tap } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { NotificationConstants } from './notification.constants';
import {
  NotificationDto,
  NotificationsListResponse,
} from './notifications-dialog.interfaces';
@Component({
  selector: 'intr-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent implements OnInit {
  public notificationsArray: NotificationDto[] = [];

  private notificationsBackup!: NotificationDto[];

  constructor(
    private notificationsApiService: NotificationsApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  public checkIfNotificationIsRead(notification: NotificationDto): boolean {
    return notification.isRead === NotificationConstants.TRUTHY_VALUE;
  }

  public deleteNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray.splice(index, 1);
    this.pushChangesToServer();
  }

  public unreadNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray[index].isRead = NotificationConstants.FALSY_VALUE;
    this.pushChangesToServer();
  }

  public readNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray[index].isRead = NotificationConstants.TRUTHY_VALUE;
    this.pushChangesToServer();
  }

  public addNotification(): void {
    this.notificationsArray.push(this.notificationsArray[0]);
    this.pushChangesToServer();
  }

  public incrementNotViewedNotificationsAmount(): void {
    this.notificationsApiService
      .incrementUnseenNotificationsAmount()
      .subscribe();
  }

  public identify(index: number, item: NotificationDto): NotificationDto {
    return item;
  }

  private loadNotifications(): void {
    this.notificationsApiService
      .getNotifications()
      .subscribe((response: NotificationsListResponse) => {
        this.notificationsArray = response.notifications;
        this.changeDetectorRef.detectChanges();
      });
  }

  private pushChangesToServer(): void {
    let operationIsSuccessful = false;
    this.notificationsApiService
      .updateServerData(this.notificationsArray)
      .pipe(
        tap({
          next: () => {
            operationIsSuccessful = true;
          },
          finalize: () => {
            if (!operationIsSuccessful) {
              this.notificationsArray = JSON.parse(JSON.stringify(this.notificationsBackup));
              this.notifyService.showTranslatedMessage(
                TranslationsEndpoints.SNACKBAR.OPERATION_DID_NOT_SUCCEED,
                Constants.SNACKBAR.ERROR_TYPE
              );
              this.changeDetectorRef.detectChanges();
            }
          }
        })
      )
      .subscribe();
  }

  private createArrayBackup(): void {
    this.notificationsBackup = JSON.parse(JSON.stringify(this.notificationsArray));
  }
}
