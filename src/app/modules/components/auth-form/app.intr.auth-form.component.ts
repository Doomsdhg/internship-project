import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/app.intr.notify.service';
import { AuthService } from 'src/app/services/web-services/app.intr.auth.service';
import { AuthenticationResponse, AuthenticationResponseError } from '../../interfaces/app.intr.authentication.interface';
import { Constants } from 'src/app/constants/main.constants';
import { LocalStorageManagerService } from 'src/app/services/app.intr.local-storage-manager.service';

@Component({
  selector: 'app-intr-auth-form',
  templateUrl: './app.intr.auth-form.component.html',
  styleUrls: ['./app.intr.auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {

  @Input() authForms: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private router: Router,
    private localStorageManager: LocalStorageManagerService
  ) { }

  login(): void {
    this.auth.login(this.authForms.controls['login'].value, this.authForms.controls['password'].value).subscribe({
      next: (success: AuthenticationResponse) => {
        this.localStorageManager.setLoginValues(success);
        this.router.navigate([Constants.APP_ROUTES.TRANSACTIONS]);
      },
      error: (error: AuthenticationResponseError) => {
        this.notify.showMessage(error.error.message, Constants.SNACKBAR.ERROR_TYPE);
      }
    });
  }

}

