import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './../../constants/app-routes.constants';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: AppRoutes.ERROR,
    component: ErrorPageComponent
  },
  {
    path: AppRoutes.UNKNOWN_ROUTE,
    pathMatch: 'full',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorLayoutRoutingModule { }
