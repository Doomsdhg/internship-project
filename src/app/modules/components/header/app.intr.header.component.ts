import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/main.constants';
import { AuthService } from 'src/app/services/web-services/app.intr.auth.service';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageManagerService } from 'src/app/services/app.intr.local-storage-manager.service';

@Component({
  selector: 'app-intr-header',
  templateUrl: './app.intr.header.component.html',
  styleUrls: ['./app.intr.header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentRoute!: string;

  public environment = environment;

  public theme!: string;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService
  ) {
    router.events.subscribe(() => {
      this.setCurrentRoute();
    });
  }

  public get authenticated(): string | null | undefined {
    return this.localStorageManagerService.getAuthenticationInfo()?.authenticated;
  }

  ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
  }

  setTheme(): void {
    this.theme = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME) || Constants.THEMES.LIGHT;
    document.getElementsByTagName('body')[0].classList.add(this.theme);
  }

  setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  redirect(route: string): void {
    this.router.navigate([route]);
  }

  switchTheme(): void {
    this.replaceThemeClass();
    this.theme = this.theme === Constants.THEMES.LIGHT ? Constants.THEMES.DARK : Constants.THEMES.LIGHT;
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME, this.theme);
  }

  replaceThemeClass(): void {
    const currentTheme = this.theme;
    const futureTheme = this.theme === Constants.THEMES.DARK ? Constants.THEMES.LIGHT : Constants.THEMES.DARK;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(currentTheme);
    body.classList.add(futureTheme);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.localStorageManagerService.deleteLoginValues();
      this.redirect(Constants.APP_ROUTES.AUTHENTICATION);
    });
  }

}
