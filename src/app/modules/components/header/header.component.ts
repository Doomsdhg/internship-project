import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { Themes } from 'src/app/constants/themes.constants';
import { environment } from 'src/environments/environment.prod';

interface SliderToggle {
  checked: boolean
}

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
    private cdr: ChangeDetectorRef
  ) {
    router.events.subscribe(() => {
      this.setCurrentRoute();
    });
  }

  ngOnInit(): void {
    this.setCurrentRoute();
    this.setTheme();
  }

  setTheme(): void {
    this.theme = localStorage.getItem(LocalStorageAcessors.THEME) || Themes.LIGHT;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add(this.theme);
  }

  setCurrentRoute(): void {
    this.currentRoute = String(window.location.href);
    this.cdr.markForCheck();
  }

  redirect(route: string): void {
    this.router.navigate(['/', route]);
  }

  switchTheme(event: SliderToggle): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.theme);
    this.theme = event.checked ?  Themes.DARK : Themes.LIGHT;
    body.classList.add(this.theme);
    localStorage.setItem(LocalStorageAcessors.THEME, this.theme);
  }

}
