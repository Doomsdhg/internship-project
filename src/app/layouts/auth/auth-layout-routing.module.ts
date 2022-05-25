import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { AuthPageComponent } from 'src/app/layouts/auth/pages/auth-page/auth-page.component';
import { PreventAuthenticatedAccessGuard } from 'src/app/layouts/base/guards/prevent-authenticated-access.guard';

const routes: Routes = [
  {
    path: AppRoutes.AUTHENTICATION,
    component: AuthPageComponent,
    canActivate: [PreventAuthenticatedAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TranslateModule]
})
export class AuthLayoutRoutingModule { }
