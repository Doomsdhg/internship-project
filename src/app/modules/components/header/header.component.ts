import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { Themes } from 'src/app/constants/themes.constants';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentRoute!: string;

  public environment = environment;

  public theme!: string;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    router.events.subscribe(() => {
      this.setCurrentRoute();
    });
  }

  ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
    localStorage.setItem('jwt', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4YzY5NzZlNWI1NDEwNDE1YmRlOTA4YmQ0ZGVlMTVkZmIxNjdhOWM4NzNmYzRiYjhhODFmNmYyYWI0NDhhOTE4Iiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJpYXQiOjE2NDkyNjA5OTUsImV4cCI6MTY0OTI2NTk5NX0.DXz19muXiIv7wEGf5ckg8G8svCHsweyTGDu-ApI3MQ08fKgvvCdUzGAOoLCDulVBjVm4kHPQjOKZQKHk6rgAdQ');
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
    this.router.navigate(['/', route]);
  }

  switchTheme(): void {
    console.log(this.theme);
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

}
