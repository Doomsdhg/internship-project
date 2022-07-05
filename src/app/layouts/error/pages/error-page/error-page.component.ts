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

  private _errorCode!: number;

  private _titleTranslationEndpoint!: string;

  private _messageTranslationEndpoint!: string;

  private _errorImageLink!: string;

  private _errorImageClass!: string;

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

  public get errorCode(): number {
    return this._errorCode;
  }

  public set errorCode(value: number) {
    this._errorCode = value;
  }

  public get titleTranslationEndpoint(): string {
    return this._titleTranslationEndpoint;
  }

  public set titleTranslationEndpoint(value: string) {
    this._titleTranslationEndpoint = value;
  }

  public get messageTranslationEndpoint(): string {
    return this._messageTranslationEndpoint;
  }

  public set messageTranslationEndpoint(value: string) {
    this._messageTranslationEndpoint = value;
  }

  public get errorImageLink(): string {
    return this._errorImageLink;
  }

  public set errorImageLink(value: string) {
    this._errorImageLink = value;
  }

  public get errorImageClass(): string {
    return this._errorImageClass;
  }

  public set errorImageClass(value: string) {
    this._errorImageClass = value;
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
