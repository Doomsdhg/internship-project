import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Snackbar } from '../constants/snackbar.constants';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) { }

  showTranslatedMessage(messageAccessor: string, messageType: string): void {
    this.translateService.get(messageAccessor).subscribe((msg: string) => {
      this.showMessage(msg, messageType);
    });
  }

  showMessage(message: string, type: string): void {
    const config = new MatSnackBarConfig();
    config.duration = Snackbar.DURATION;
    config.panelClass = [type + Snackbar.CLASSNAME_POSTFIX];
    this.snackBar.open(message, undefined, config);
  }
}
