import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-intr-root',
  templateUrl: './app.intr.root-component.html',
  styleUrls: ['app.intr.root-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  public title = 'internship-project';

}
