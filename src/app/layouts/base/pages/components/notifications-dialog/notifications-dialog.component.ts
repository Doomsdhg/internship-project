import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, ObservableInput } from 'rxjs';
import { NotificationsBellComponent } from 'src/app/components/notifications-bell/notifications-bell.component';
import { Constants } from 'src/app/constants/constants';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { SpinnerService } from 'src/app/services/spinner.service';
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

  private readonly OVERLAY_CUSTOM_CLASS = 'notifications-dialog-container';

  private _notificationsArray: NotificationDto[] = [];

  private _notificationsArrayBackup!: NotificationDto[];

  private _notificationsAreLoading!: boolean;

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

  public get notificationsArray(): NotificationDto[] {
    return this._notificationsArray;
  }

  public set notificationsArray(value: NotificationDto[]) {
    this._notificationsArray = value;
  }

  public get notificationsArrayBackup(): NotificationDto[] {
    return this._notificationsArrayBackup;
  }

  public set notificationsArrayBackup(value: NotificationDto[]) {
    this._notificationsArrayBackup = value;
  }

  public get notificationsAreLoading(): boolean {
    return this._notificationsAreLoading;
  }

  public set notificationsAreLoading(value: boolean) {
    this._notificationsAreLoading = value;
  }

  private loadNotifications(): void {
    this.displaySpinner();
    this.notificationsApiService.getNotifications()
      .subscribe((response: NotificationsListResponse) => {
        this.notificationsArray = response.notifications;
        this.hideSpinner();
        this.changeDetectorRef.detectChanges();
      });
  }

  private displaySpinner(): void {
    this.notificationsAreLoading = true;
  }

  private hideSpinner(): void {
    this.notificationsAreLoading = false;
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
