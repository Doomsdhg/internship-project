import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsDialogComponent } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.component';
import { NotificationsAmountResponse } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.interfaces';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';

@Component({
  selector: 'intr-notifications-bell',
  templateUrl: './notifications-bell.component.html',
  styleUrls: ['./notifications-bell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsBellComponent implements OnInit {

  private readonly PANEL_CLASS = 'notifications-dialog';

  private readonly BACKDROP_CLASS = 'notification-backdrop';
  
  private _unseenNotificationsAmount!: number;

  constructor(
    private matDialog: MatDialog,
    private notificationsApiService: NotificationsApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUnseenAmount();
  }

  public handleBellClick(): void {
    this.openNotificationsDialog();
    this.refreshNotificationsCount();
  }

  public getUnseenAmount(): void {
    this.notificationsApiService.getNotificationsAmount()
    .subscribe((response: NotificationsAmountResponse) => {
      this.handleNotificationsAmountResponse(response);
    });
  }

  public get unseenNotificationsAmount(): number {
    return this._unseenNotificationsAmount;
  }

  public set unseenNotificationsAmount(value: number) {
    this._unseenNotificationsAmount = value;
  }

  private refreshNotificationsCount(): void {
    this.notificationsApiService.nullifyNotificationsAmount()
    .subscribe((response: NotificationsAmountResponse) => {
      this.handleNotificationsAmountResponse(response);
    });
  }

  private openNotificationsDialog(): void {
    this.matDialog.open(NotificationsDialogComponent, {
      panelClass: this.PANEL_CLASS,
      backdropClass: this.BACKDROP_CLASS
    });
  }

  private handleNotificationsAmountResponse(response: NotificationsAmountResponse): void {
    this.unseenNotificationsAmount = +response.amount;
    this.changeDetectorRef.detectChanges();
  }
}
