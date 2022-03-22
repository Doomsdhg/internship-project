import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  public title = 'internship-project';

  selectLanguageForm: FormGroup = new FormGroup({});

  language!: string | null;

  selectedOption: string;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    const language = localStorage.getItem('language') || 'en';
    this.translateService.use(language);
    this.selectedOption = language;
    this.selectLanguageForm = fb.group({
      language: [this.selectedOption]
    })
  }

  async ngOnInit(): Promise<void> {
    this.language = localStorage.getItem('language') || environment.defaultLocale;
  }

  transactionsRedirect(): void {
    this.router.navigate(['transactions'], { relativeTo: this.route })
  }

  changeLanguage(): void {
    localStorage.setItem('language', this.selectLanguageForm.controls['language'].value)
    window.location.reload()
  }

}
