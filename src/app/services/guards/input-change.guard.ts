import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GuardDialogContentComponent } from 'src/app/modules/components/guard-dialog-content/guard-dialog-content.component';
import { ComponentWithInput } from './component-with-input.interface';
import { TransactionsTablePageComponent } from 'src/app/modules/pages/transactions-table-page/transactions-table-page.component';

@Injectable({
  providedIn: 'root'
})
export class InputChangeGuard implements CanDeactivate<ComponentWithInput> {

  constructor(private dialog: MatDialog) { }

  public canDeactivate(component: TransactionsTablePageComponent): Observable<boolean> | boolean {
    if (component.inputChanged) {
      return this.dialog.open(GuardDialogContentComponent).afterClosed();
    }
    return true;
  }
}
