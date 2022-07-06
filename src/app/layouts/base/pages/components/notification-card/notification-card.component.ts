import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import { Constants } from 'src/app/constants/constants';
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

  @Input() notification!: NotificationDto;

  @Input() index!: number;

  @Output() readonly unreadNotificationEvent = new EventEmitter<number>();

  @Output() readonly readNotificationEvent = new EventEmitter<number>();

  @Output() readonly deleteNotificationEvent = new EventEmitter<number>();

  private _messageToDisplay!: string;

  private _nameIsValid!: boolean;

  public get nameIsValid(): boolean {
    return this._nameIsValid;
  }

  public set nameIsValid(value: boolean) {
    this._nameIsValid = value;
  }

  public get notificationReadAlready(): boolean {
    return this.notification.isRead === Constants.BOOLEAN.TRUE;
  }

  public get messageToDisplay(): string {
    return this._messageToDisplay;
  }

  public set messageToDisplay(value: string) {
    this._messageToDisplay = value;
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

  public setUsernameValidity(value: boolean): void {
    this.nameIsValid = value;
    this.formMessageToDisplay(this.notification);
  }

  private formMessageToDisplay({ user, text }: NotificationDataRequiredForMessage): void {
    this.messageToDisplay = this.nameIsValid
      ? `**${user?.firstName} ${user?.secondName}** ${text}`
      : text;
  }
}
