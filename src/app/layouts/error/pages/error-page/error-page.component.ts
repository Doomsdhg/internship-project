import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsEndpoints } from 'src/app/constants/translations-endpoints.constants';
import { RedirectService } from 'src/app/services/redirect.service';
import { ErrorPageConstants } from './error-page.constants';

@Component({
  selector: 'intr-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent implements OnInit {

  public errorCode!: number;

  public headLine!: string;

  public message!: string;

  public errorImageLink!: string;

  public errorImageClass!: string;

  constructor(
    private redirectService: RedirectService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getErrorInfo();
  }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }

  private getErrorInfo(): void {
    this.errorCode = history.state.code;
    this.getTranslatedErrorText();
    this.getErrorImage();
  }

  private getTranslatedErrorText = (): void => {
    const errorHeadlineEndpoint = TranslationsEndpoints.ERROR_PAGE.getErrorHeadlineEndpoint(this.errorCode);
    const errorMessageEndPoint = TranslationsEndpoints.ERROR_PAGE.getErrorMessageEndpoint(this.errorCode);
    this.translateService.get([errorHeadlineEndpoint, errorMessageEndPoint])
      .subscribe((translation): void => {
        this.headLine = translation[errorHeadlineEndpoint];
        this.message = translation[errorMessageEndPoint];
      });
  }

  private getErrorImage = (): void => {
    this.errorImageLink = ErrorPageConstants.IMAGES_LINKS.getErrorImageLink(this.errorCode);
    this.errorImageClass = ErrorPageConstants.CLASS_NAME.getErrorImageClass(this.errorCode);
  }
}
