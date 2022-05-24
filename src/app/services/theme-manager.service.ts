import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  public themeSubject: BehaviorSubject<string>;

  constructor(localStorageManagerService: LocalStorageManagerService) {
    this.themeSubject = new BehaviorSubject<string>(localStorageManagerService.chosenTheme);
  }

  public passNewTheme(newTheme: string): void {
    this.themeSubject.next(newTheme);
  }
}
