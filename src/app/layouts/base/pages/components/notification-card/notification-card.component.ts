import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import { NotificationConstants } from '../notifications-dialog/notification.constants';
import {
  NotificationDto,
  UserInfo
} from '../notifications-dialog/notifications-dialog.interfaces';

interface NotificationDataRequiredForMessage {
  user?: UserInfo;
  text: string;
}

@Component({
  selector: 'intr-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardComponent {
  
  public messageToDisplay!: string;

  public nameIsvalid!: boolean;

  @Input() notification!: NotificationDto;

  @Input() index!: number;

  @Output() readonly unreadNotificationEvent = new EventEmitter<number>();

  @Output() readonly readNotificationEvent = new EventEmitter<number>();

  @Output() readonly deleteNotificationEvent = new EventEmitter<number>();

  public get notificationReadAlready(): boolean {
    return this.notification.isRead === NotificationConstants.TRUTHY_VALUE;
  }

  public unreadNotification(): void {
    this.unreadNotificationEvent.emit(this.index);
  }

  public readNotification(): void {
    this.readNotificationEvent.emit(this.index);
  }

  public deleteNotification(): void {
    this.deleteNotificationEvent.emit(this.index);
  }

  public setUsernameValidity(value: any): void {
    this.nameIsvalid = value;
    this.formMessageToDisplay();
  }

  private formMessageToDisplay(): void {
    const { user, text }: NotificationDataRequiredForMessage = this.notification;
    this.messageToDisplay = this.nameIsvalid
      ? `**${user.firstName} ${user.secondName}** ${text}`
      : text;
  }
}
