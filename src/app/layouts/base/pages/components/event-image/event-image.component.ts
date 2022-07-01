import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationDto, UserInfo } from '../notifications-dialog/notifications-dialog.interfaces';

@Component({
  selector: 'intr-event-image',
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.scss']
})
export class EventImageComponent implements OnInit {

  @Input() userInfo!: UserInfo;

  @Output() readonly initialsValidityChange = new EventEmitter<boolean>();

  public userInitials!: string;

  public nameIsValid!: boolean;

  ngOnInit(): void {
    this.getUserInitials();
  }

  private getUserInitials(): void {
    try {
      const { firstName, secondName }: UserInfo = this.userInfo;
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
