import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RedirectService } from 'src/app/services/redirect.service';
import { HttpStatusCode } from './../../../../enums/HttpStatusCode';

@Component({
  selector: 'intr-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent implements OnInit {

  public errorStatus!: number;

  public isPageNotFoundError!: boolean;

  constructor(
    private redirectService: RedirectService) { }

  ngOnInit(): void {
    this.getErrorInfo();
  }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }

  private getErrorInfo(): void {
    this.errorStatus = history.state.status;
    this.isPageNotFoundError = history.state.status === HttpStatusCode.NOT_FOUND;
  }
}
