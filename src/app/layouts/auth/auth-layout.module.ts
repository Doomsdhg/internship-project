import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AuthLayoutRoutingModule } from 'src/app/layouts/auth/auth-layout-routing.module';
import { AuthPageComponent } from 'src/app/layouts/auth/pages/auth-page/auth-page.component';
import { AuthFormComponent } from 'src/app/layouts/auth/pages/components/auth-form/auth-form.component';
import { AuthLayoutComponent } from './auth-layout.component';

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
    TranslateModule
  ],
  bootstrap: [AuthLayoutComponent],
})
export class AuthLayoutModule { }
