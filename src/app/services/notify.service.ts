import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, isError: boolean){
    const config = new MatSnackBarConfig()
    config.duration = 2000;
    if (isError) {
      config.panelClass = ['error-snackbar']
    } else {
      config.panelClass = ['success-snackbar']
    }
    this.snackBar.open(message, undefined, config)
  }
}
