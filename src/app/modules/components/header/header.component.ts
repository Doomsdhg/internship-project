import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/main.constants';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'intr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentRoute!: string;

  public environment = environment;

  public currentTheme!: string;

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

  public get authenticated(): string | null | undefined {
    return this.localStorageManager.getAuthenticationInfo()?.authenticated;
  }

  ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
  }

  setTheme(): void {
    const theme = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME) || Constants.THEMES.LIGHT;
    this.currentTheme = theme;
    document.getElementsByTagName('body')[0].classList.add(theme);
    this.changeButtonsClasses(theme);
  }

  setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  redirect(route: string): void {
    this.router.navigate([route]);
  }

  switchTheme(selectedTheme: string): void {
    this.switchThemeClass(selectedTheme);
    this.changeButtonsClasses(selectedTheme);
    this.changeButtonsClasses(this.currentTheme);
    this.currentTheme = selectedTheme;
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME, this.currentTheme);
    this.cdr.detectChanges();
  }

  changeButtonsClasses(theme: string): void {
    const buttonsArray = document.getElementsByClassName(`${theme}-button`);
    Array.prototype.forEach.call(buttonsArray, function(button: HTMLElement): void {
      button.classList.toggle('display-none');
    });
  }

  switchThemeClass(selectedTheme: string): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.currentTheme);
    body.classList.add(selectedTheme);
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.redirect(Constants.APP_ROUTES.AUTHENTICATION);
      this.localStorageManager.deleteLoginValues();
    });
  }
}
