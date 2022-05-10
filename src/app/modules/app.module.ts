import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsTableComponent } from './components/transactions-table/intr.transactions-table.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransactionApiService } from '../services/web-services/intr.transaction-api.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifyService } from '../services/intr.notify.service';
import { MatSortModule } from '@angular/material/sort';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/intr.transactions-table-page.component';
import { GuardDialogContentComponent } from './components/guard-dialog-content/intr.guard-dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NumbersOnlyDirective } from './directives/intr.numbers-only.directive';
import { CurrencyPipe } from '@angular/common';
import { SelectLanguageComponent } from './components/select-language/intr.select-language.component';
import { NumericLengthDirective } from './directives/intr.numeric-length.directive';
import { HeaderComponent } from './components/header/intr.header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthPageComponent } from './pages/auth-page/intr.auth-page.component';
import { AuthFormComponent } from './components/auth-form/intr.auth-form.component';
import { AuthInterceptor } from './interceptors/intr.auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    AuthFormComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    NgxSpinnerModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NotifyService,
    TransactionApiService,
    HttpClient,
    CurrencyPipe
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
