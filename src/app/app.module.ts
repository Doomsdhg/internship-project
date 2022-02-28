import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from "@ngrx/store";
import * as fromReducer from "./store/example.reducer";
import { TransactionRowComponent } from './transaction-row/transaction-row.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TransactionRowComponent
  ],
  imports: [
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ example: fromReducer.reducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
