import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './../../constants/app-routes.constants';
import { InternalServerErrorPageComponent } from './pages/internal-server-error-page/internal-server-error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: AppRoutes.PAGE_NOT_FOUND,
    component: NotFoundPageComponent
  },
  {
    path: AppRoutes.INTERNAL_SERVER_ERROR,
    component: InternalServerErrorPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorLayoutRoutingModule { }
