import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  @ViewChild(TransactionsTableComponent) TransactionsTableComponent!: TransactionsTableComponent;

  public title: string = 'internship-project';

  language!: string | null;

  constructor(
    private translateService: TranslateService
   ) {
     this.translateService.use(localStorage.getItem('language') || 'en');
     }

  async ngOnInit(): Promise<void> {
    this.language = localStorage.getItem('language') || environment.defaultLocale;
  }

  changeLanguage(e: Event): void {
    const target = e.target as HTMLButtonElement;
    localStorage.setItem('language', target.value)
    window.location.reload()
  }

}
