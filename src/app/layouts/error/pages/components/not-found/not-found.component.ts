import { Component } from '@angular/core';
import { RedirectService } from './../../../../../services/redirect.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(
    private redirectService: RedirectService) { }

  public redirectToHomePage(): void {
    this.redirectService.goToHomePage();
  }
}
