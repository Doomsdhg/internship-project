import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorLayoutRoutingModule } from './error-layout-routing.module';
import { ErrorLayoutComponent } from './error-layout.component';


@NgModule({
  declarations: [
    ErrorLayoutComponent
  ],
  imports: [
    CommonModule,
    ErrorLayoutRoutingModule
  ]
})
export class ErrorLayoutModule { }
