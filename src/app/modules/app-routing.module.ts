import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputChangeGuard } from '../services/guards/input-change.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';
import { AppRoutes } from '../constants/app-routes.constants';

const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  {
    path: 'transactions',
    component: TransactionsTablePageComponent
  },
  {
    path: AppRoutes.AUTHENTICATION,
    component: AuthPageComponent
  },
  {
    path: 'transactions/:id',
    canDeactivate: [InputChangeGuard],
    component: TransactionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TranslateModule, TransactionPageComponent]
})

export class AppRoutingModule { }
