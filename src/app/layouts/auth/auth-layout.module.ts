import { AuthLayoutComponent } from './auth-layout.component';
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
import { AuthLayoutRoutingModule } from 'src/app/layouts/auth/auth-layout-routing.module';
import { AuthInterceptor } from 'src/app/layouts/auth/interceptors/auth.interceptor';
import { AuthPageComponent } from 'src/app/layouts/auth/pages/auth-page/auth-page.component';
import { AuthFormComponent } from 'src/app/layouts/auth/pages/components/auth-form/auth-form.component';
import { TransactionApiService } from 'src/app/layouts/base/services/transaction-api.service';
import { NotifyService } from 'src/app/services/notify.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthPageComponent,
    AuthFormComponent
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
    AuthLayoutRoutingModule,
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
  bootstrap: [AuthLayoutComponent],
})
export class AuthLayoutModule { }
