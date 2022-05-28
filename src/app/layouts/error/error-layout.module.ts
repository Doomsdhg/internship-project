import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorLayoutRoutingModule } from './error-layout-routing.module';
import { ErrorLayoutComponent } from './error-layout.component';
import { InternalServerErrorPageComponent } from './pages/internal-server-error-page/internal-server-error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ErrorLayoutComponent,
    NotFoundPageComponent,
    InternalServerErrorPageComponent,
    ErrorPageComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    ErrorLayoutRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: false,
    })
  ]
})
export class ErrorLayoutModule { }
