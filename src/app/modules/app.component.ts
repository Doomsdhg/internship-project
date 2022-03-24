import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    this.router.navigate(['transactions'], { relativeTo: this.route })
  }
}
