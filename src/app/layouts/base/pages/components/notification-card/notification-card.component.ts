import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationConstants } from '../notifications-dialog/notification.constants';
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

  @Input() index!: number;

  @Output() readonly unreadNotificationEvent = new EventEmitter();

  @Output() readonly readNotificationEvent = new EventEmitter();

  @Output() readonly deleteNotificationEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.formMessageToDisplay();
    this.getInitials();
  }

  public get notificationReadAlready(): boolean {
    return this.notification.isRead === NotificationConstants.TRUTHY_VALUE;
  }

  public unreadNotification(): void {
    this.notification.isRead = NotificationConstants.FALSY_VALUE;
    this.unreadNotificationEvent.emit();
  }

  public readNotification(): void {
    this.notification.isRead = NotificationConstants.TRUTHY_VALUE;
    this.readNotificationEvent.emit();
  }

  public deleteNotification(): void {
    this.notification.isDeleted = NotificationConstants.TRUTHY_VALUE;
    this.deleteNotificationEvent.emit(this.index);
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
