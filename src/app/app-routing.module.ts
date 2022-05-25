import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { InputChangeGuard } from 'src/app/layouts/base/guards/input-change.guard';
import { PreventAuthenticatedAccessGuard } from 'src/app/layouts/base/guards/prevent-authenticated-access.guard';
import { PreventUnathenticatedAccessGuard } from 'src/app/layouts/auth/guards/prevent-unathenticated-access.guard';
import { AuthPageComponent } from 'src/app/layouts/auth/pages/auth-page/auth-page.component';
import { TransactionsTablePageComponent } from 'src/app/layouts/base/pages/transactions-table-page/transactions-table-page.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TranslateModule]
})
export class AppRoutingModule { }
