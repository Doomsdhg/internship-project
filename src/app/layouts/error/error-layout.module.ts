import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorLayoutRoutingModule } from './error-layout-routing.module';
import { ErrorLayoutComponent } from './error-layout.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

@NgModule({
  declarations: [
    ErrorLayoutComponent,
    ErrorPageComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    ErrorLayoutRoutingModule,
    TranslateModule
  ]
})
export class ErrorLayoutModule { }
