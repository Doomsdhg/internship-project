import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeManagerService } from './../services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-component.html',
  styleUrls: ['app-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{

  public title = 'internship-project';

  public currentTheme!: string;

  constructor(private themeManagerService: ThemeManagerService) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeManagerService.themeSubject.value;
    this.subscribeToThemeChanges();
  }

  private subscribeToThemeChanges(): void {
    this.themeManagerService.themeSubject.asObservable().subscribe((newTheme) => {
      this.currentTheme = newTheme;
    });
  }
}
