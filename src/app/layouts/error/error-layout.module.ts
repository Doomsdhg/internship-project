import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorLayoutRoutingModule } from './error-layout-routing.module';
import { ErrorLayoutComponent } from './error-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { InternalServerErrorPageComponent } from './pages/internal-server-error-page/internal-server-error-page.component';


@NgModule({
  declarations: [
    ErrorLayoutComponent,
    NotFoundPageComponent,
    InternalServerErrorPageComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    ErrorLayoutRoutingModule
  ]
})
export class ErrorLayoutModule { }
