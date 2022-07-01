import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsDialogComponent } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.component';
import { NotificationAmountResponse } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.interfaces';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';

@Component({
  selector: 'intr-notifications-bell',
  templateUrl: './notifications-bell.component.html',
  styleUrls: ['./notifications-bell.component.scss']
})
export class NotificationsBellComponent implements OnInit {

  public unseenNotificationsAmount!: number;

  private readonly PANEL_CLASS = 'notifications-dialog';

  private readonly BACKDROP_CLASS = 'notification-backdrop';

  constructor(
    private matDialog: MatDialog,
    private notificationsApiService: NotificationsApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getUnseenNotificationsAmount();
  }

  public handleBellClick(): void {
    this.openNotificationsDialog();
    this.nullifyNotificationsAmount();
  }

  public getUnseenNotificationsAmount(): void {
    this.notificationsApiService.getNotificationsAmount()
    .subscribe((response: NotificationAmountResponse) => {
      this.handleNotificationsAmountResponse(response);
    });
  }

  private nullifyNotificationsAmount(): void {
    this.notificationsApiService.nullifyNotificationsAmount()
    .subscribe((response: NotificationAmountResponse) => {
      this.handleNotificationsAmountResponse(response);
    });
  }

  private openNotificationsDialog(): void {
    this.matDialog.open(NotificationsDialogComponent, {
      panelClass: this.PANEL_CLASS,
      backdropClass: this.BACKDROP_CLASS
    });
  }

  private handleNotificationsAmountResponse(response: NotificationAmountResponse): void {
    this.unseenNotificationsAmount = +response.amount;
    this.changeDetectorRef.detectChanges();
  }
}
