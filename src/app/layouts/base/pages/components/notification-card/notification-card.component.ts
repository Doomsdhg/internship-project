import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NotificationConstants } from '../notifications-dialog/notification.constants';
import {
  NotificationDto,
  UserInfo,
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
export class NotificationCardComponent implements OnInit {
  public messageToDisplay!: string;

  public initials!: string;

  public nameIsInvalid!: boolean;

  @Input() notification!: NotificationDto;

  @Input() index!: number;

  @Output() readonly unreadNotificationEvent = new EventEmitter<number>();

  @Output() readonly readNotificationEvent = new EventEmitter<number>();

  @Output() readonly deleteNotificationEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.getInitials();
    this.formMessageToDisplay();
  }

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

  private formMessageToDisplay(): void {
    const { user, text }: NotificationDataRequiredForMessage = this.notification;
    this.messageToDisplay = this.nameIsInvalid
      ? text
      : `**${user.firstName} ${user.secondName}** ${text}`;
  }

  private getInitials(): void {
    try {
      const { firstName, secondName }: UserInfo = this.notification.user;
      this.initials = firstName.charAt(0).toUpperCase() + secondName.charAt(0).toUpperCase();
    } catch {
      this.nameIsInvalid = true;
    }
  }
}
