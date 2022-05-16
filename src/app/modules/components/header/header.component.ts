import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/general.constants';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { Theme } from './Theme.type';
import { HeaderConstants } from './header.constants';

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
    private auth: AuthService,
    private localStorageManager: LocalStorageManagerService
  ) {}

  public get authenticated(): boolean {
    return Boolean(this.localStorageManager.getAuthenticationInfo()?.authenticated);
  }

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.setCurrentRoute();
    });
    this.setCurrentRoute();
    this.enableDefaultTheme();
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

  public enableLightTheme(): void {
    this.changeTheme(HeaderConstants.AVAILABLE_THEMES.light);
  }

  public enableDarkTheme(): void {
    this.changeTheme(HeaderConstants.AVAILABLE_THEMES.dark);
  }

  public logout(): void {
    this.auth.logout();
  }

  private enableDefaultTheme(): void {
    const theme = new Theme(localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME) || HeaderConstants.AVAILABLE_THEMES.light.name);
    this.currentTheme = theme;
    document.getElementsByTagName('body')[0].classList.add(theme.name);
    this.changeButtonsClasses(theme);
  }

  private changeTheme(selectedTheme: Theme): void {
    this.changeThemeClass(selectedTheme);
    this.changeButtonsClasses(selectedTheme);
    this.changeButtonsClasses(this.currentTheme);
    this.currentTheme = selectedTheme;
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME, this.currentTheme.name);
  }

  private setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  private changeButtonsClasses(theme: Theme): void {
    const buttonsArray = document.getElementsByClassName(`${theme.name}-button`);
    Array.prototype.forEach.call(buttonsArray, function(button: HTMLElement): void {
      button.classList.toggle('display-none');
    });
  }

  private changeThemeClass(selectedTheme: Theme): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.currentTheme.name);
    body.classList.add(selectedTheme.name);
  }
}
