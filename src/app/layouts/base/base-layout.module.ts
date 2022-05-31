import { HttpClient } from '@angular/common/http';
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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BaseLayoutRoutingModule } from 'src/app/layouts/base/base-layout-routing.module';
import { GuardDialogContentComponent } from 'src/app/layouts/base/pages/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';
import { BaseLayoutComponent } from './base-layout.component';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BaseLayoutComponent,
    TransactionsTableComponent,
    TransactionsTablePageComponent,
    GuardDialogContentComponent
  ],
  imports: [
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
    TranslateModule
  ],
  bootstrap: [BaseLayoutComponent],
})
export class BaseLayoutModule { }
