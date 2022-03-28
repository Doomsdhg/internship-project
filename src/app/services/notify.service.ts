import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Snackbar } from '../constants/snackbar.constants';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, type: string): void {
    const config = new MatSnackBarConfig();
    config.duration = Snackbar.DURATION;
    config.panelClass = [type + Snackbar.CLASSNAME_POSTFIX];
    this.snackBar.open(message, undefined, config);
  }
}
