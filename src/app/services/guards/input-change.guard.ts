import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GuardDialogContentComponent } from 'src/app/modules/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionPageComponent } from 'src/app/modules/pages/transaction-page/transaction-page.component';

interface ComponentWithInput {
  checkIfInputsChanged: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class InputChangeGuard implements CanDeactivate<ComponentWithInput> {

  constructor(private dialog: MatDialog) { }

  canDeactivate(component: TransactionPageComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.transactionUpdateForm.dirty) {
      return this.dialog.open(GuardDialogContentComponent).afterClosed()
    }
    return true
  }

}
