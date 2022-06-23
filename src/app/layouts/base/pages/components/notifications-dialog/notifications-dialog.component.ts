import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'intr-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrls: ['./notifications-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
