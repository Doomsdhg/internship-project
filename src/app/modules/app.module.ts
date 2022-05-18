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
import { NotifyService } from '../services/notify.service';
import { TransactionApiService } from '../services/web-services/transaction-api.service';
import { AppComponent } from './app-component';
import { AppRoutingModule } from './app-routing.module';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { GuardDialogContentComponent } from './components/guard-dialog-content/guard-dialog-content.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { NumericLengthDirective } from './directives/numbers-limit.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

export function tokenGetter(): string | null {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    TransactionsTableComponent,
    TransactionsTablePageComponent,
    GuardDialogContentComponent,
    NumbersOnlyDirective,
    SelectLanguageComponent,
    NumericLengthDirective,
    HeaderComponent,
    AuthPageComponent,
    AuthFormComponent,
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
    AppRoutingModule,
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
  providers: [
    MatSpinner,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NotifyService,
    TransactionApiService,
    HttpClient,
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
