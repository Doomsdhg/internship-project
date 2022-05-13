import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from '../modules/components/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  displaySpinner(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
      const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
      this.overlayRef.attach(spinnerOverlayPortal);
    }
  }

  hideSpinner(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
