import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'app-internal-server-error-page',
  templateUrl: './internal-server-error-page.component.html',
  styleUrls: ['./internal-server-error-page.component.scss']
})
export class InternalServerErrorPageComponent {

  constructor(
    private router: Router,
    private localStorageManagerService: LocalStorageManagerService) { }

  public redirectToHome(): void {
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo().authenticated;
    this.router.navigate([isAuthenticated ? AppRoutes.TRANSACTIONS : AppRoutes.AUTHENTICATION]);
  }
}
