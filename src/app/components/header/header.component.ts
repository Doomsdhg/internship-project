import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layouts/auth/services/auth.service';
import { NotificationsDialogComponent } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.component';
import { NotificationAmountResponse } from 'src/app/layouts/base/pages/components/notifications-dialog/notifications-dialog.interfaces';
import { NotificationsApiService } from 'src/app/layouts/base/services/notifications-api.service';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';
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

  public unseenNotificationsAmount!: number;

  private PANEL_CLASS = 'notifications-dialog';

  private BACKDROP_CLASS = 'notification-backdrop';

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private localStorageManagerService: LocalStorageManagerService,
    private themeManagerService: ThemeManagerService,
    private matDialog: MatDialog,
    private notificationsApiService: NotificationsApiService
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

  public get themeIcon(): string {
    return this.isLightTheme ? HeaderConstants.THEMES_ICONS.DARK : HeaderConstants.THEMES_ICONS.LIGHT;
  }

  public ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.setCurrentRoute();
    });
    this.setCurrentTheme();
    this.getUnseenNotificationsAmount();
  }

  public redirectTo(route: string): void {
    this.router.navigate([route]);
  }

  public toggleTheme(): void {
    this.changeTheme(
      this.currentTheme.name === HeaderConstants.AVAILABLE_THEMES.LIGHT.name
      ? HeaderConstants.AVAILABLE_THEMES.DARK
      : HeaderConstants.AVAILABLE_THEMES.LIGHT
      );
  }

  public logout(): void {
    this.authService.logout();
  }

  public handleBellClick(): void {
    this.openNotificationsDialog();
    this.nullifyUnseenNotificationsAmount();
  }

  public getUnseenNotificationsAmount(): void {
    this.notificationsApiService.getNotificationsAmount()
    .subscribe((response: NotificationAmountResponse) => {
      this.unseenNotificationsAmount = +response.amount;
    });
  }

  private nullifyUnseenNotificationsAmount(): void {
    this.notificationsApiService.nullifyUnseenNotificationsAmount()
    .subscribe((success: NotificationAmountResponse) => {
      this.unseenNotificationsAmount = +success.amount;
      this.changeDetectorRef.detectChanges();
    });
  }

  private openNotificationsDialog(): void {
    this.matDialog.open(NotificationsDialogComponent, {
      panelClass: this.PANEL_CLASS,
      backdropClass: this.BACKDROP_CLASS
    });
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
