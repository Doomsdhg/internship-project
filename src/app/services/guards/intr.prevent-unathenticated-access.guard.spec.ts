import { TestBed } from '@angular/core/testing';
import { LocalStorageAcessors } from '../../constants/local-storage-accessors.constants';
import { LocalStorageManagerService } from '../local-storage-manager.service';
import { PreventUnathenticatedAccessGuard } from './prevent-unathenticated-access.guard';

describe('PreventUnathenticatedAccessGuard', () => {
  let guard: PreventUnathenticatedAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageManagerService,
      ]
    });
    guard = TestBed.inject(PreventUnathenticatedAccessGuard);
  });

  it('should call localStorageManagerService getAuthenticationInfo function and return true', () => {
    spyOn(guard.localStorageManager, 'getAuthenticationInfo').and.callThrough();
    guard.canActivate();
    localStorage.setItem(LocalStorageAcessors.AUTHENTICATED, 'true');
    expect(guard.localStorageManager.getAuthenticationInfo).toHaveBeenCalled();
    expect(guard.canActivate()).toBe(true);
  });
});
