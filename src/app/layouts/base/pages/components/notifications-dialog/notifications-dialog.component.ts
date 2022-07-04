import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, ObservableInput } from 'rxjs';
import { NotificationsBellComponent } from 'src/app/components/notifications-bell/notifications-bell.component';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import {
  NotificationDto,
  NotificationsListResponse
} from './notifications-dialog.interfaces';
@Component({
  selector: 'intr-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent implements OnInit {

  public notificationsArray: NotificationDto[] = [];

  private readonly OVERLAY_CUSTOM_CLASS = 'notifications-dialog-container';

  private notificationsArrayBackup!: NotificationDto[];

  constructor(
    private notificationsApiService: NotificationsApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private notifyService: NotifyService,
    private matDialogRef: MatDialogRef<NotificationsBellComponent>,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.addOverlayClass();
    this.loadNotifications();
    this.removeClassAfterClose();
  }

  public checkIfNotificationIsRead(notification: NotificationDto): boolean {
    return notification.isRead === Constants.BOOLEAN.TRUE;
  }

  public deleteNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray.splice(index, 1);
    this.pushChangesToServer();
  }

  public unreadNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray[index].isRead = Constants.BOOLEAN.FALSE;
    this.pushChangesToServer();
  }

  public readNotification(index: number): void {
    this.createArrayBackup();
    this.notificationsArray[index].isRead = Constants.BOOLEAN.TRUE;
    this.pushChangesToServer();
  }

  public identify(index: number, item: NotificationDto): NotificationDto {
    return item;
  }

  public get notificationsArrayIsEmpty(): boolean {
    return this.notificationsArray.length === 0;
  }

  private loadNotifications(): void {
    this.notificationsApiService.getNotifications()
      .subscribe((response: NotificationsListResponse) => {
        this.notificationsArray = response.notifications;
        this.changeDetectorRef.detectChanges();
      });
  }

  private pushChangesToServer(): void {
    this.notificationsApiService.updateServerData(this.notificationsArray)
      .pipe(
        catchError((error: HttpErrorResponse): ObservableInput<HttpErrorResponse> => {
          this.notificationsArray = JSON.parse(JSON.stringify(this.notificationsArrayBackup));
          this.notifyService.showTranslatedMessage(
            TranslationsEndpoints.SNACKBAR.OPERATION_DID_NOT_SUCCEED,
            Constants.SNACKBAR.ERROR_TYPE
          );
          this.changeDetectorRef.detectChanges();
          return [error];
        })
      )
      .subscribe();
  }

  private createArrayBackup(): void {
    this.notificationsArrayBackup = JSON.parse(JSON.stringify(this.notificationsArray));
  }

  private addOverlayClass(): void {
    this.overlay.getContainerElement().classList.add(this.OVERLAY_CUSTOM_CLASS);
  }

  private removeOverlayClass(): void {
    this.overlay.getContainerElement().classList.remove(this.OVERLAY_CUSTOM_CLASS);
  }

  private removeClassAfterClose(): void {
    this.matDialogRef.afterClosed()
    .subscribe(() => {
      this.removeOverlayClass();
    });
  }
}
