import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/web-services/auth.service';

@Component({
  selector: 'intr-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {

  public authForms: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private auth: AuthService
  ) { }

  public login(): void {
    const loginInput = this.authForms.controls['login'].value;
    const passwordInput = this.authForms.controls['password'].value;
    this.auth.login(loginInput, passwordInput);
  }
}

