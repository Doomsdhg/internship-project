import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { AuthenticationResponse, AuthenticationResponseError } from '../../interfaces/authentication.interface';
import { AppRoutes } from 'src/app/constants/app-routes.constants';
import { LocalStorageManagerService } from 'src/app/services/local-storage-manager.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input()
  authForms: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    public auth: AuthService,
    private notify: NotifyService,
    public router: Router,
    private localStorageManager: LocalStorageManagerService
  ) { }

  login(): void {
    //TODO: to const
    this.auth.login(this.authForms.controls['login'].value, this.authForms.controls['password'].value).subscribe({
      next: (success: AuthenticationResponse) => {
        this.localStorageManager.setLoginValues(success);
        this.router.navigate([AppRoutes.TRANSACTIONS]);
      },
      error: (error: AuthenticationResponseError) => {
        this.notify.showMessage(error.error.message, Snackbar.ERROR_TYPE);
      }
    });
  }

}

