import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeManagerService } from 'src/app/services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-component.html',
  styleUrls: ['app-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private _title = 'internship-project';

  private _currentTheme!: string;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private themeManagerService: ThemeManagerService,
    public overlayContainer: OverlayContainer) { }

  public ngOnInit(): void {
    this.subscribeToThemeChanges();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get currentTheme(): string {
    return this._currentTheme;
  }

  public set currentTheme(value: string) {
    this._currentTheme = value;
  }

  private subscribeToThemeChanges(): void {
    this.themeManagerService.themeSubject.asObservable()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((newTheme) => {
      this.overlayContainer.getContainerElement().classList.remove(this.currentTheme);
      this.currentTheme = newTheme;
      this.overlayContainer.getContainerElement().classList.add(newTheme);
    });
  }
}
