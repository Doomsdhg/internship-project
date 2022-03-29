import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from '../constants/api-endpoints.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  public title = 'internship-project';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  transactionsRedirect(): void {
    this.router.navigate([ApiEndpoints.TRANSACTIONS], { relativeTo: this.route });
  }
}
