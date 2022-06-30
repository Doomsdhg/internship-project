import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationDto, UserInfo } from '../notifications-dialog/notifications-dialog.interfaces';

@Component({
  selector: 'intr-notification-image',
  templateUrl: './notification-image.component.html',
  styleUrls: ['./notification-image.component.scss']
})
export class NotificationImageComponent implements OnInit {

  @Input() notificationData!: NotificationDto;

  @Output() readonly initialsValidityChange = new EventEmitter<boolean>();

  public userInitials!: string;

  public nameIsValid!: boolean;

  ngOnInit(): void {
    this.getUserInitials()
  }

  private getUserInitials(): void {
    try {
      const { firstName, secondName }: UserInfo = this.notificationData.user;
      this.userInitials = firstName.charAt(0).toUpperCase() + secondName.charAt(0).toUpperCase();
      this.setValidityValue(true);
    } catch {
      this.setValidityValue(false);
    }
  }

  private setValidityValue(value: boolean): void {
    this.nameIsValid = value;
    this.initialsValidityChange.emit(this.nameIsValid);
  }
}
