import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxErrorsModule } from '@ngspot/ngx-errors';
import { TranslateModule } from '@ngx-translate/core';
import { BaseLayoutRoutingModule } from 'src/app/layouts/base/base-layout-routing.module';
import { GuardDialogContentComponent } from 'src/app/layouts/base/pages/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';
import { BaseLayoutComponent } from './base-layout.component';
import { ManageTransactionsDialogComponent } from './pages/components/add-transaction/manage-transactions-dialog.component';
import { AppliedTransactionsListComponent } from './pages/components/applied-transactions-list/applied-transactions-list.component';
import { MatCardModule } from '@angular/material/card';
import { TransactionCardComponent } from './pages/components/transaction-card/transaction-card.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    TransactionsTableComponent,
    TransactionsTablePageComponent,
    GuardDialogContentComponent,
    ManageTransactionsDialogComponent,
    AppliedTransactionsListComponent,
    TransactionCardComponent
  ],
  imports: [
    MatCardModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BaseLayoutRoutingModule,
    BrowserAnimationsModule,
    TranslateModule,
    NgxErrorsModule,
    DragDropModule
  ],
  bootstrap: [BaseLayoutComponent],
})
export class BaseLayoutModule { }
