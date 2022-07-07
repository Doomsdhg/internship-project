import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/constants/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'intr-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent implements OnInit {

  private _selectLanguageForm!: FormControl;

  private currentLanguage!: string;

  constructor(
    private translateService: TranslateService,
  ) { }

  public ngOnInit(): void {
    this.setCurrentLanguage();
    this.useLanguage();
    this.buildSelectLanguageForm();
  }

  public changeLanguage(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.LANGUAGE, this.selectLanguageForm.value);
    window.location.reload();
  }

  public get selectLanguageForm(): FormControl {
    return this._selectLanguageForm;
  }

  public set selectLanguageForm(value: FormControl) {
    this._selectLanguageForm = value;
  }

  private setCurrentLanguage(): void {
    const defaultLanguage = environment.defaultLocale;
    const previouslySelectedLanguage = localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.LANGUAGE);
    this.currentLanguage = previouslySelectedLanguage || defaultLanguage;
  }

  private useLanguage(): void {
    this.translateService.use(this.currentLanguage);
  }

  private buildSelectLanguageForm(): void {
    this.selectLanguageForm = new FormControl(this.currentLanguage);
  }
}
