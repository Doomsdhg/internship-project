import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GuardDialogContentComponent } from 'src/app/modules/components/guard-dialog-content/app.intr.guard-dialog-content.component';
import { TransactionsTableComponent } from '../../modules/components/transactions-table/app.intr.transactions-table.component';

interface ComponentWithInput {
  get inputChanged(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InputChangeGuard implements CanDeactivate<ComponentWithInput> {

  constructor(private matDialog: MatDialog) { }

  canDeactivate(component: TransactionsTableComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.inputChanged) {
      return this.matDialog.open(GuardDialogContentComponent).afterClosed();
    }
    return true;
  }

}
