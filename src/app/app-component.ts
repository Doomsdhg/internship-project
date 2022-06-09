import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeManagerService } from 'src/app/services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-component.html',
  styleUrls: ['app-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public title = 'internship-project';

  public currentTheme!: string;

  constructor(
    private themeManagerService: ThemeManagerService,
    public overlayContainer: OverlayContainer) { }

  public ngOnInit(): void {
    this.subscribeToThemeChanges();
  }

  private subscribeToThemeChanges(): void {
    this.themeManagerService.themeSubject.asObservable().subscribe((newTheme) => {
      this.overlayContainer.getContainerElement().classList.remove(this.currentTheme);
      this.currentTheme = newTheme;
      this.overlayContainer.getContainerElement().classList.add(newTheme);
    });
  }
}
