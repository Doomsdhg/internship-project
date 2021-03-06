import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthenticatedAccessGuard implements CanActivate {

  constructor(private localStorageManagerService: LocalStorageManagerService) {
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
    return !isAuthenticated;
  }
}
