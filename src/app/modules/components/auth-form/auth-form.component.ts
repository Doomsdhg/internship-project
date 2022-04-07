import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { AuthenticationResponse, AuthenticationResponseError } from '../../interfaces/authentication.interface';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input()
  authForms: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  constructor (
    private auth: AuthService, 
    private notify: NotifyService,
    private router: Router) {}

  login(): void {
    this.auth.login(this.authForms.controls['login'].value, this.authForms.controls['password'].value).subscribe({
      next: (success: AuthenticationResponse) => {
      console.log(success);
      localStorage.setItem('jwt', success.accessToken);
      localStorage.setItem('tokenType', success.type);
      localStorage.setItem('refreshToken', success.refreshToken);
      this.router.navigate(['transactions']);
      },
      error: (error: AuthenticationResponseError) => {
        console.log(error);
        this.notify.showMessage(error.error.message, Snackbar.ERROR_TYPE);
      }
    });
  }
}

