import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageManagerService } from '../app.intr.local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthenticatedAccessGuard implements CanActivate {

  constructor(private localStorageManagerService: LocalStorageManagerService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !(this.localStorageManagerService.getAuthenticationInfo()?.authenticated);
  }

}
