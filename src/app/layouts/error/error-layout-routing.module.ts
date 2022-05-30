import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './../../constants/app-routes.constants';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NotFoundComponent } from './pages/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: AppRoutes.ERROR,
    component: ErrorPageComponent
  },
  {
    path: AppRoutes.UNKNOWN_ROUTE,
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorLayoutRoutingModule { }
