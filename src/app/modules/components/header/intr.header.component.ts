import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { Themes } from 'src/app/constants/themes.constants';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'intr-header',
  templateUrl: './intr.header.component.html',
  styleUrls: ['./intr.header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentRoute!: string;

  public environment = environment;

  public theme!: string;

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

  public get authenticated() {
    return this.localStorageManager.getAuthenticationInfo()?.authenticated;
  }

  ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
  }

  setTheme(): void {
    this.theme = localStorage.getItem(LocalStorageAcessors.THEME) || Themes.LIGHT;
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
    this.theme = this.theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    localStorage.setItem(LocalStorageAcessors.THEME, this.theme);
  }

  replaceThemeClass(): void {
    const currentTheme = this.theme;
    const futureTheme = this.theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(currentTheme);
    body.classList.add(futureTheme);
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.localStorageManager.deleteLoginValues();
      this.redirect(AppRoutes.AUTHENTICATION);
    });
  }

}
