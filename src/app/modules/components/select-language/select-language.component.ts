import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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
export class SelectLanguageComponent implements OnInit {

  public selectLanguageForm!: FormControl;

  private currentLanguage!: string;

  constructor(
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.currentLanguage = localStorage.getItem(Constants.LOCAL_STORAGE.ACCESSORS.LANGUAGE) || environment.defaultLocale;
    this.translateService.use(this.currentLanguage);
    this.selectLanguageForm = new FormControl(this.currentLanguage);
  }

  public changeLanguage(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE.ACCESSORS.LANGUAGE, this.selectLanguageForm.value);
    window.location.reload();
  }
}
