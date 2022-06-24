import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NotificationDto, UserInfo } from '../notifications-dialog/notifications-dialog.interfaces';

interface NotificationDataRequiredForMessage {
  user: UserInfo;
  text: string;
}

@Component({
  selector: 'intr-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationCardComponent implements OnInit {

  public messageToDisplay!: string;

  public initials!: string;

  @Input() notification!: NotificationDto;

  constructor() { }

  ngOnInit(): void {
    this.formMessageToDisplay();
    this.getInitials();
  }

  private formMessageToDisplay(): void {
    const { user, text }: NotificationDataRequiredForMessage = this.notification;
    this.messageToDisplay = user.firstName + ' ' + user.secondName + ' ' + text;
  }

  private getInitials(): void {
    const { firstName, secondName }: UserInfo = this.notification.user;
    this.initials = firstName.charAt(0).toUpperCase() + secondName.charAt(0).toUpperCase();
  }
}
