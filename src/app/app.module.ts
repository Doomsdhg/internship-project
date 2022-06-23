import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SelectLanguageComponent } from 'src/app/components/select-language/select-language.component';
import { BaseHttpInterceptor } from 'src/app/interceptors/base-http.interceptor';
import { AppComponent } from './app-component';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { AuthLayoutModule } from './layouts/auth/auth-layout.module';
import { BaseLayoutModule } from './layouts/base/base-layout.module';
import { ErrorLayoutModule } from './layouts/error/error-layout.module';
import { MatBadgeModule } from '@angular/material/badge';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectLanguageComponent,
    SpinnerOverlayComponent,
  ],
  imports: [
    MatDialogModule,
    AuthLayoutModule,
    BaseLayoutModule,
    ErrorLayoutModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
