import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Constants } from 'src/app/constants/main.constants';

@Component({
  selector: 'app-intr-select-language',
  templateUrl: './app.intr.select-language.component.html',
  styleUrls: ['./app.intr.select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent {

  selectLanguageForm: FormControl;

  language!: string | null;

  constructor(
    private translateService: TranslateService,
    public router: Router
  ) {
    this.language = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.LANGUAGE) || environment.defaultLocale;
    this.translateService.use(this.language);
    this.selectLanguageForm = new FormControl(this.language);
  }

  changeLanguage(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.LANGUAGE, this.selectLanguageForm.value);
    window.location.reload();
  }

}
