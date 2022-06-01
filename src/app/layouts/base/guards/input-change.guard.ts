import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardDialogContentComponent } from 'src/app/layouts/base/pages/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';
import { ComponentWithInput } from './component-with-input.interface';

@Injectable({
  providedIn: 'root'
})
export class InputChangeGuard implements CanDeactivate<ComponentWithInput> {

  constructor(private matDialog: MatDialog) { }

  public canDeactivate(component: TransactionsTablePageComponent): Observable<boolean> | boolean {
    if (component.inputChanged) {
      return this.matDialog.open(GuardDialogContentComponent).afterClosed();
    }
    return true;
  }
}
