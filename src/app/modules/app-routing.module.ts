import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputChangeGuard } from '../services/guards/input-change.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';
import { AppRoutes } from '../constants/app-routes.constants';
import { PreventAuthenticatedAccessGuard } from '../services/guards/prevent-authenticated-access.guard';
import { PreventUnathenticatedAccessGuard } from '../services/guards/prevent-unathenticated-access.guard';

const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  {
    path: 'transactions',
    component: TransactionsTablePageComponent,
    canActivate: [PreventUnathenticatedAccessGuard]
  },
  {
    path: AppRoutes.AUTHENTICATION,
    component: AuthPageComponent,
    canActivate: [PreventAuthenticatedAccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TranslateModule]
})

export class AppRoutingModule { }
