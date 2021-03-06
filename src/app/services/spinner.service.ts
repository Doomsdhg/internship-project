import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from 'src/app/components/spinner-overlay/spinner-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) { }

  public displaySpinner(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
      const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
      this.overlayRef.attach(spinnerOverlayPortal);
    }
  }

  public hideSpinner(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
