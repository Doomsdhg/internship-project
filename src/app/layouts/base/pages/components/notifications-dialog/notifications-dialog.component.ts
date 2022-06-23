import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'intr-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<HeaderComponent>) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {

  }
}
