import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/general.constants';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { Theme } from './Theme.type';

@Component({
  selector: 'intr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  private readonly themes: {light: Theme, dark: Theme} = {
    light: {
      name: 'light-theme'
    },
    dark: {
      name: 'dark-theme'
    }
  };

  public currentRoute!: string;

  public environment = environment;

  public currentTheme!: Theme;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private localStorageManager: LocalStorageManagerService
  ) {
    router.events.subscribe(() => {
      this.setCurrentRoute();
    });
  }

  public get authenticated(): string {
    return this.localStorageManager.getAuthenticationInfo()?.authenticated || 'false';
  }

  public ngOnInit(): void {
    this.setCurrentRoute();
    this.enableDefaultTheme();
  }

  private enableDefaultTheme(): void {
    const theme = new Theme(localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME) || this.themes.light.name);
    this.currentTheme = theme;
    document.getElementsByTagName('body')[0].classList.add(theme.name);
    this.changeButtonsClasses(theme.name);
  }

  private setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

  public changeTheme(selectedTheme: Theme): void {
    this.changeThemeClass(selectedTheme.name);
    this.changeButtonsClasses(selectedTheme.name);
    this.changeButtonsClasses(this.currentTheme.name);
    this.currentTheme = selectedTheme;
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME, this.currentTheme.name);
  }

  private changeButtonsClasses(theme: string): void {
    const buttonsArray = document.getElementsByClassName(`${theme}-button`);
    Array.prototype.forEach.call(buttonsArray, function(button: HTMLElement): void {
      button.classList.toggle('display-none');
    });
  }

  private changeThemeClass(selectedTheme: string): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.currentTheme.name);
    body.classList.add(selectedTheme);
  }

  public enableLightTheme(): void {
    this.changeTheme(this.themes.light);
  }

  public enableDarkTheme(): void {
    this.changeTheme(this.themes.dark);
  }

  public logout(): void {
    this.auth.logout().subscribe(() => {
      this.localStorageManager.deleteLoginValues();
      this.redirect(AppRoutes.AUTHENTICATION);
    });
  }
}
