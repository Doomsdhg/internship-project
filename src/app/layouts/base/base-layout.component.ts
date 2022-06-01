import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'intr-base-layout',
  templateUrl: './base-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLayoutComponent { }
