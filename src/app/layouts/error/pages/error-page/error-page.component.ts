import { HttpStatusCode } from './../../../../enums/HttpStatusCode';
import { LocalStorageManagerService } from './../../../../services/local-storage-manager.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

  notFoundError = false;

  internalServerError = false;

  constructor(
    private localStorageManagerService: LocalStorageManagerService,
    private router: Router) { }

  ngOnInit(): void {
    this.notFoundError = this.localStorageManagerService.error === HttpStatusCode.NOT_FOUND ? true : false;
    this.internalServerError = this.localStorageManagerService.error === HttpStatusCode.INTERNAL_SERVER_ERROR ? true : false;
  }

  public redirectToHome(): void {
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo().authenticated;
    this.router.navigate([isAuthenticated ? AppRoutes.TRANSACTIONS : AppRoutes.AUTHENTICATION]);
  }
}
