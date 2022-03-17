import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';

const routes: Routes = [
  {path: 'transactions', component: TransactionsTablePageComponent},
  {path: 'transactions/:id', component: TransactionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TranslateModule]
})

export class AppRoutingModule { }
