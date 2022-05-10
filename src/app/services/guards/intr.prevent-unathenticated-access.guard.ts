import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageManagerService } from '../intr.local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnathenticatedAccessGuard implements CanActivate {

  constructor(private localStorageManager: LocalStorageManagerService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!(this.localStorageManager.getAuthenticationInfo()?.authenticated);
  }

}
