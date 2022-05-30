import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthLayoutRoutingModule } from 'src/app/layouts/auth/auth-layout-routing.module';
import { AuthPageComponent } from 'src/app/layouts/auth/pages/auth-page/auth-page.component';
import { AuthFormComponent } from 'src/app/layouts/auth/pages/components/auth-form/auth-form.component';
import { AuthLayoutComponent } from './auth-layout.component';

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
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
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
