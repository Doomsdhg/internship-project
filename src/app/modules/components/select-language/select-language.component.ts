import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';

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
    this.language = localStorage.getItem(LocalStorageAcessors.LANGUAGE) || environment.defaultLocale;
    this.translateService.use(this.language);
    this.selectLanguageForm = new FormControl(this.language);
  }

  changeLanguage(): void {
    localStorage.setItem(LocalStorageAcessors.LANGUAGE, this.selectLanguageForm.value);
    this.reloadCurrentPage();
  }

  reloadCurrentPage(): void {
    window.location.reload();
  }
}
