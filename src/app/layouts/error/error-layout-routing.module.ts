import { InternalServerErrorPageComponent } from './pages/internal-server-error-page/internal-server-error-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AppRoutes } from './../../constants/app-routes.constants';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundPageComponent
  },
  {
    path: AppRoutes.INTERNAL_SERVER_ERROR,
    component: InternalServerErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorLayoutRoutingModule { }
