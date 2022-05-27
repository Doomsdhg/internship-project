import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {

  constructor(
    private router: Router,
    private localStorageManagerService: LocalStorageManagerService) { }

  public redirectToHome(): void {
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo().authenticated;
    this.router.navigate([isAuthenticated ? AppRoutes.TRANSACTIONS : AppRoutes.AUTHENTICATION]);
  }
}
