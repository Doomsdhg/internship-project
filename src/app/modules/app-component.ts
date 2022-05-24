import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { HeaderConstants } from './components/header/header.constants';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeManagerService } from './../services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-component.html',
  styleUrls: ['app-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  public title = 'internship-project';

  public currentTheme!: string;

  constructor(private themeManagerService: ThemeManagerService) {
    console.log(themeManagerService.themeSubject.value);
    this.currentTheme = themeManagerService.themeSubject.value;
    this.subscribeToThemeChanges();
  }

  private subscribeToThemeChanges(): void {
    this.themeManagerService.themeSubject.asObservable().subscribe((newTheme) => {
      this.currentTheme = newTheme;
    });
  }
}
