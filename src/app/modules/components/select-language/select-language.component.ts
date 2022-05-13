import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Constants } from 'src/app/constants/general.constants';

@Component({
  selector: 'intr-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent {

  public selectLanguageForm: FormControl;

  private currentLanguage!: string | null;

  constructor(
    private translateService: TranslateService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.currentLanguage = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESSORS.LANGUAGE) || environment.defaultLocale;
    this.translateService.use(this.currentLanguage);
    this.selectLanguageForm = new FormControl(this.currentLanguage);
  }

  public changeLanguage(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_ACCESSORS.LANGUAGE, this.selectLanguageForm.value);
    window.location.reload();
  }
}
