import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputChangeGuard } from '../services/guards/input-change.guard';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';

const routes: Routes = [
  {path: 'transactions',
  component: TransactionsTablePageComponent},
  {path: 'transactions/:id', 
  canDeactivate: [InputChangeGuard],
  component: TransactionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TranslateModule, TransactionPageComponent]
})

export class AppRoutingModule { }
