import { BaseLayoutComponent } from './base-layout.component';
import { SelectLanguageComponent } from 'src/app/layouts/base/pages/components/select-language/select-language.component';
import { HeaderComponent } from 'src/app/layouts/base/pages/components/header/header.component';
import { SpinnerOverlayComponent } from 'src/app/layouts/base/pages/components/spinner-overlay/spinner-overlay.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from 'src/app/app-component';
import { AuthInterceptor } from 'src/app/layouts/auth/interceptors/auth.interceptor';
import { BaseLayoutRoutingModule } from 'src/app/layouts/base/base-layout-routing.module';
import { GuardDialogContentComponent } from 'src/app/layouts/base/pages/components/guard-dialog-content/guard-dialog-content.component';
import { TransactionsTableComponent } from 'src/app/layouts/base/pages/components/transactions-table/transactions-table.component';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    BaseLayoutComponent,
    TransactionsTableComponent,
    TransactionsTablePageComponent,
    GuardDialogContentComponent,
    SpinnerOverlayComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    BrowserModule,
    BaseLayoutRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: false,
    })
  ],
  bootstrap: [BaseLayoutComponent],
})
export class BaseLayoutModule { }
