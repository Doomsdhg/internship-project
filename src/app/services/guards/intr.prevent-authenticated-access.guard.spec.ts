import { TestBed } from '@angular/core/testing';
import { LocalStorageAcessors } from '../../constants/local-storage-accessors.constants';
import { LocalStorageManagerService } from '../local-storage-manager.service';
import { PreventAuthenticatedAccessGuard } from './prevent-authenticated-access.guard';

describe('PreventAuthenticatedAccessGuard', () => {
  let guard: PreventAuthenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageManagerService,
      ]
    });
    guard = TestBed.inject(PreventAuthenticatedAccessGuard);
  });

  it('should call localStorageManagerService getAuthenticationInfo function and return true', () => {
    spyOn(guard.localStorageManager, 'getAuthenticationInfo').and.callThrough();
    guard.canActivate();
    localStorage.removeItem(LocalStorageAcessors.AUTHENTICATED);
    expect(guard.localStorageManager.getAuthenticationInfo).toHaveBeenCalled();
    expect(guard.canActivate()).toBe(true);
  });
});
