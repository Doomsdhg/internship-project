import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageManagerService } from '../../../services/local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnathenticatedAccessGuard implements CanActivate {

  constructor(private localStorageManagerService: LocalStorageManagerService) {
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = !!this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
    return isAuthenticated;
  }
}
