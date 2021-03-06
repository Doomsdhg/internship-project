import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from '../notifications-dialog/notifications-dialog.interfaces';

@Component({
  selector: 'intr-event-image',
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventImageComponent implements OnInit {

  @Input() userInfo!: UserInfo;

  @Output() readonly initialsValidityChange = new EventEmitter<boolean>();

  private _nameIsValid!: boolean;

  private _userInitials!: string;

  ngOnInit(): void {
    this.getUserInitials();
  }

  public get userInitials(): string {
    return this._userInitials;
  }

  public set userInitials(value: string) {
    this._userInitials = value;
  }

  public get nameIsValid(): boolean {
    return this._nameIsValid;
  }

  public set nameIsValid(value: boolean) {
    this._nameIsValid = value;
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
