import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { MatInputModule } from '@angular/material/input';           
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionApiService } from '../services/web-services/transaction-api.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifyService } from '../services/notify.service';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';
import { TransactionsTablePageComponent } from './pages/transactions-table-page/transactions-table-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'app/assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionsTableComponent,
    TransactionPageComponent,
    TransactionsTablePageComponent
  ],
  imports: [
    MatSortModule,
    FormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: false,
    })
  ],
  providers: [
    NotifyService,
    TransactionApiService,
    HttpClient
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }