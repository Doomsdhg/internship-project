import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { HeaderConstants } from './header.constants';
import { Theme } from './Theme.model';

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
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService
  ) { }

  public get isAuthenticated(): boolean {
    return Boolean(this.localStorageManagerService.getAuthenticationInfo()?.authenticated);
  }

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.setCurrentRoute();
    });
    this.setCurrentRoute();
    this.enableDefaultTheme();
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

  private enableDefaultTheme(): void {
    const theme = new Theme(localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.THEME) || HeaderConstants.AVAILABLE_THEMES.LIGHT.name);
    this.currentTheme = theme;
    document.getElementsByTagName('body')[0].classList.add(theme.name);
    this.toggleButtonsDisplay(theme);
  }

  private changeTheme(selectedTheme: Theme): void {
    this.changeThemeClass(selectedTheme);
    this.toggleButtonsDisplay(selectedTheme);
    this.toggleButtonsDisplay(this.currentTheme);
    this.currentTheme = selectedTheme;
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.THEME, this.currentTheme.name);
  }

  private setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  private toggleButtonsDisplay(theme: Theme): void {
    const buttonsArray = document.getElementsByClassName(`${theme.name}-button`);
    Array.prototype.forEach.call(buttonsArray, function (button: HTMLElement): void {
      button.classList.toggle('display-none');
    });
  }

  private changeThemeClass(selectedTheme: Theme): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.currentTheme.name);
    body.classList.add(selectedTheme.name);
  }
}
