import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { El } from '../../models/interfaces/browser-event.interface';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private el : ElementRef, private renderer: Renderer2, private notify: NotifyService) { }

  @HostListener('input', ['$event.target']) onInput(element: El): void {
    if (isNaN(+element.value)) {
      element.value = element.value.slice(0, -1)
      this.notify.showMessage('This field is numbers only', 'error')
    }
  }

}
