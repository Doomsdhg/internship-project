import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/web-services/auth.service';

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

  constructor (private auth: AuthService) {}

  login(): void {
    this.auth.login().subscribe((success) => {
      localStorage.setItem('jwt', success.accessToken);
      localStorage.setItem('refreshToken', success.refreshToken);
      console.log(success);
    }
    );
  }

}
