import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../constants/app-routes.constants';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private localStorageManagerService: LocalStorageManagerService,
    private router: Router
  ) { }

  public goToHomePage(): void {
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo().authenticated;
    this.router.navigate([isAuthenticated ? AppRoutes.TRANSACTIONS : AppRoutes.AUTHENTICATION]);
  }
}
