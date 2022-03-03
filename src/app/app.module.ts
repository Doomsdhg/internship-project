import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from "@ngrx/store";
import * as fromReducer from "./store/example.reducer";
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddTransactionComponentComponent } from './add-transaction-component/add-transaction-component.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import {MatInputModule} from '@angular/material/input';
import { TableRowComponent } from './transactions-table/table-row/table-row.component'; 

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponentComponent,
    TransactionsTableComponent,
    TableRowComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ example: fromReducer.reducer })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
