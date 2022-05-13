import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants/general.constants';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) { }

  public showTranslatedMessage(messageAccessor: string, messageType: string): void {
    this.translateService.get(messageAccessor).subscribe((msg: string) => {
      this.showMessage(msg, messageType);
    });
  }

  public showMessage(message: string, type: string): void {
    const config = new MatSnackBarConfig();
    config.duration = Constants.SNACKBAR.DURATION;
    config.panelClass = [type + Constants.SNACKBAR.CLASSNAME_POSTFIX];
    this.snackBar.open(message, undefined, config);
  }
}
