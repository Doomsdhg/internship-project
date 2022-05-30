import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants/constants';
import { MessageType } from './notify.service.message.type';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private matSnackBar: MatSnackBar,
    private translateService: TranslateService) { }

  public showTranslatedMessage(messageAccessor: string, messageType: MessageType): void {
    this.translateService.get(messageAccessor).subscribe((msg: string) => {
      this.showMessage(msg, messageType);
    });
  }

  public showMessage(message: string, messageType: MessageType): void {
    const config = this.createConfig(messageType);
    this.matSnackBar.open(message, undefined, config);
  }

  private createConfig(messageType: MessageType): MatSnackBarConfig {
    const config = new MatSnackBarConfig();
    config.duration = Constants.SNACKBAR.DURATION;
    config.panelClass = [messageType + Constants.SNACKBAR.CLASSNAME_POSTFIX];
    return config;
  }
}
