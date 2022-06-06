import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
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

  public titleTranslationEndpoint!: string;

  public messageTranslationEndpoint!: string;

  public errorImageLink!: string;

  public errorImageClass!: string;

  constructor(
    private redirectService: RedirectService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getErrorInfo();
  }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }

  private getErrorInfo(): void {
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
  }

  private getErrorImage = (): void => {
    this.errorImageLink = ErrorPageConstants.IMAGES_LINKS.getErrorImageLink(this.errorCode);
    this.errorImageClass = ErrorPageConstants.CLASS_NAME.getErrorImageClass(this.errorCode);
  }
}
