import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageManagerService } from '../local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthenticatedAccessGuard implements CanActivate {

  constructor(private localStorageManager: LocalStorageManagerService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !(this.localStorageManager.getAuthenticationInfo()?.authenticated);
  }
  
}
