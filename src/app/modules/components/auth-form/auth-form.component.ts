import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Snackbar } from 'src/app/constants/snackbar.constants';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/web-services/auth.service';
import { AuthenticationResponse, AuthenticationResponseError, DecodedToken } from '../../interfaces/authentication.interface';
import jwtDecode from "jwt-decode";
import { LocalStorageAcessors } from 'src/app/constants/local-storage-accessors.constants';
import { AppRoutes } from 'src/app/constants/app-routes.constants';

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

  constructor (
    private auth: AuthService, 
    private notify: NotifyService,
    private router: Router
) {
    }

  login(): void {
    this.auth.login(this.authForms.controls['login'].value, this.authForms.controls['password'].value).subscribe({
      next: (success: AuthenticationResponse) => {
      console.log(success);
      const decodedToken: DecodedToken = jwtDecode(success.accessToken);
      console.log(jwtDecode(success.accessToken));
      localStorage.setItem(LocalStorageAcessors.TOKEN, success.accessToken);
      localStorage.setItem(LocalStorageAcessors.REFRESH_TOKEN, success.refreshToken);
      localStorage.setItem(LocalStorageAcessors.USERNAME, success.username);
      localStorage.setItem(LocalStorageAcessors.TOKEN_EXPIRATION_DATE, String(decodedToken.exp));
      localStorage.setItem(LocalStorageAcessors.TOKEN_CREATION_DATE, String(decodedToken.iat));
      this.router.navigate([AppRoutes.TRANSACTIONS]);
      },
      error: (error: AuthenticationResponseError) => {
        console.log(error);
        this.notify.showMessage(error.error.message, Snackbar.ERROR_TYPE);
      }
    });
  }

}

