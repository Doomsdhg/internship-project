import { Component } from '@angular/core';
import { RedirectService } from './../../../../../services/redirect.service';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss']
})
export class InternalServerErrorComponent {

  constructor(
    private redirectService: RedirectService) { }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }
}
