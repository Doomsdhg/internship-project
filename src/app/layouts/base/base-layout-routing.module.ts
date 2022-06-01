import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { PreventUnathenticatedAccessGuard } from 'src/app/layouts/auth/guards/prevent-unathenticated-access.guard';
import { InputChangeGuard } from 'src/app/layouts/base/guards/input-change.guard';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.TRANSACTIONS, pathMatch: 'full' },
  {
    path: AppRoutes.TRANSACTIONS,
    component: TransactionsTablePageComponent,
    canActivate: [PreventUnathenticatedAccessGuard],
    canDeactivate: [InputChangeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TranslateModule]
})
export class BaseLayoutRoutingModule { }
