import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GuardDialogContentComponent } from 'src/app/modules/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionPageComponent } from 'src/app/modules/pages/transaction-page/transaction-page.component';

@Injectable({
  providedIn: 'root'
})
export class InputChangeGuard implements CanDeactivate<any> {

  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: TransactionPageComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.compareFormValues()) {
        const dialogRef = this.dialog.open(GuardDialogContentComponent);
        return dialogRef.afterClosed()
      }
    return true
  }
  
}
