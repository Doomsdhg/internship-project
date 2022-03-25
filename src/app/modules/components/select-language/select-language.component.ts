import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent {

  selectLanguageForm: FormControl;

  language!: string | null;

  constructor(
    private translateService: TranslateService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.language = localStorage.getItem('language') || environment.defaultLocale
    this.translateService.use(this.language)
    this.selectLanguageForm = new FormControl(this.language)
  }

  changeLanguage(): void {
    localStorage.setItem('language', this.selectLanguageForm.value)
    window.location.reload()
  }

}
