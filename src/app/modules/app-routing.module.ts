import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputChangeGuard } from '../services/guards/input-change.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';
import { Constants } from '../constants/main.constants';
import { PreventAuthenticatedAccessGuard } from '../services/guards/prevent-authenticated-access.guard';
import { PreventUnathenticatedAccessGuard } from '../services/guards/prevent-unathenticated-access.guard';

const routes: Routes = [
  { path: '', redirectTo: Constants.APP_ROUTES.TRANSACTIONS, pathMatch: 'full' },
  {
    path: Constants.APP_ROUTES.TRANSACTIONS,
    component: TransactionsTablePageComponent,
    canActivate: [PreventUnathenticatedAccessGuard],
    canDeactivate: [InputChangeGuard]
  },
  {
    path: Constants.APP_ROUTES.AUTHENTICATION,
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
