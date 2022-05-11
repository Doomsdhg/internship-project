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

  public ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
  }

  private setTheme(): void {
    const theme = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME) || Constants.THEMES.LIGHT;
    this.currentTheme = theme;
    document.getElementsByTagName('body')[0].classList.add(theme);
    this.changeButtonsClasses(theme);
  }

  private setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }

  public switchTheme(selectedTheme: string): void {
    this.switchThemeClass(selectedTheme);
    this.changeButtonsClasses(selectedTheme);
    this.changeButtonsClasses(this.currentTheme);
    this.currentTheme = selectedTheme;
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.THEME, this.currentTheme);
    this.cdr.detectChanges();
  }

  private changeButtonsClasses(theme: string): void {
    const buttonsArray = document.getElementsByClassName(`${theme}-button`);
    Array.prototype.forEach.call(buttonsArray, function(button: HTMLElement): void {
      button.classList.toggle('display-none');
    });
  }

  private switchThemeClass(selectedTheme: string): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.currentTheme);
    body.classList.add(selectedTheme);
  }

  public logout(): void {
    this.auth.logout().subscribe(() => {
      this.localStorageManager.deleteLoginValues();
      this.redirect(Constants.APP_ROUTES.AUTHENTICATION);
    });
  }
}
