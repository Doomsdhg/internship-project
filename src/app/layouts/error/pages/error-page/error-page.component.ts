import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute, Params } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
=======
import { TranslateService } from '@ngx-translate/core';
>>>>>>> main
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

<<<<<<< HEAD
  public titleTranslationEndpoint!: string;

  public messageTranslationEndpoint!: string;
=======
  public errorHeadLine!: string;

  public errorMessage!: string;
>>>>>>> main

  public errorImageLink!: string;

  public errorImageClass!: string;

  constructor(
    private redirectService: RedirectService,
<<<<<<< HEAD
    private activatedRoute: ActivatedRoute
    ) { }
=======
    private translateService: TranslateService) { }
>>>>>>> main

  ngOnInit(): void {
    this.getErrorInfo();
  }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }

  private getErrorInfo(): void {
<<<<<<< HEAD
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.errorCode = params[AppRoutes.CODE_PARAM];
        this.getTextTranslationEndpoints();
        this.getErrorImage();
      });
  }

  private getTextTranslationEndpoints = (): void => {
    this.titleTranslationEndpoint = TranslationsEndpoints.ERROR_PAGE.getErrorHeadlineEndpoint(this.errorCode);
    this.messageTranslationEndpoint = TranslationsEndpoints.ERROR_PAGE.getErrorMessageEndpoint(this.errorCode);
=======
    this.errorCode = history.state.code;
    this.getTranslatedErrorText();
    this.getErrorImage();
  }

  private getTranslatedErrorText = (): void => {
    const errorHeadlineEndpoint = TranslationsEndpoints.ERROR_PAGE.getErrorHeadlineEndpoint(this.errorCode);
    const errorMessageEndPoint = TranslationsEndpoints.ERROR_PAGE.getErrorMessageEndpoint(this.errorCode);
    this.translateService.get([errorHeadlineEndpoint, errorMessageEndPoint])
      .subscribe((translation): void => {
        this.errorHeadLine = translation[errorHeadlineEndpoint];
        this.errorMessage = translation[errorMessageEndPoint];
      });
>>>>>>> main
  }

  private getErrorImage = (): void => {
    this.errorImageLink = ErrorPageConstants.IMAGES_LINKS.getErrorImageLink(this.errorCode);
    this.errorImageClass = ErrorPageConstants.CLASS_NAME.getErrorImageClass(this.errorCode);
  }
}
