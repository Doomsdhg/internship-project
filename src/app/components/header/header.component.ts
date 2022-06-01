import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { AuthService } from 'src/app/layouts/auth/services/auth.service';
import { ThemeManagerService } from 'src/app/services/theme-manager.service';
import { HeaderConstants } from './header.constants';
import { Theme } from './theme.model';

@Component({
  selector: 'intr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentRoute!: string;

  public currentTheme!: Theme;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private themeManagerService: ThemeManagerService
  ) { }

  public get isAuthenticated(): boolean {
    return Boolean(this.localStorageManagerService.getAuthenticationInfo()?.authenticated);
  }

  public get isDarkTheme(): boolean {
    return this.currentTheme.name === HeaderConstants.AVAILABLE_THEMES.DARK.name;
  }

  public get isLightTheme(): boolean {
    return this.currentTheme.name === HeaderConstants.AVAILABLE_THEMES.LIGHT.name;
  }

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.setCurrentRoute();
    });
    this.setCurrentTheme();
  }

  public redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  public enableLightTheme(): void {
    this.changeTheme(HeaderConstants.AVAILABLE_THEMES.LIGHT);
  }

  public enableDarkTheme(): void {
    this.changeTheme(HeaderConstants.AVAILABLE_THEMES.DARK);
  }

  public logout(): void {
    this.authService.logout();
  }

  private setCurrentTheme(): void {
    const previouslySelectedThemeName = this.localStorageManagerService.chosenTheme;
    const defaultThemeName = HeaderConstants.AVAILABLE_THEMES.LIGHT.name;
    this.currentTheme = new Theme(previouslySelectedThemeName || defaultThemeName);
  }

  private changeTheme(selectedTheme: Theme): void {
    this.currentTheme = selectedTheme;
    this.localStorageManagerService.setNewTheme(selectedTheme.name);
    this.themeManagerService.passNewTheme(selectedTheme.name);
  }

  private setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.changeDetectorRef.markForCheck();
  }
}
