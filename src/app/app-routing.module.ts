import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule, TranslateModule],
  exports: [RouterModule, MatTableModule, TranslatePipe],
  providers: [TranslateModule]
})
export class AppRoutingModule { }
