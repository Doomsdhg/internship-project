import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarConfig } from '../constants/snackbar-config.constants';

@Injectable({
  providedIn: 'root'
})

export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, type: string) {
    const config = new MatSnackBarConfig();
    config.duration = SnackbarConfig.duration;
    config.panelClass = type === 'error' ? ['error-snackbar'] : ['success-snackbar'];
    this.snackBar.open(message, undefined, config)
  }
}
