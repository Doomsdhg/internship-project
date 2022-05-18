import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/web-services/auth.service';

@Component({
  selector: 'intr-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit {

  public authForms!: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildAuthForms();
  }

  public login(): void {
    const loginInput = this.authForms.controls['login'].value;
    const passwordInput = this.authForms.controls['password'].value;
    this.authService.login(loginInput, passwordInput);
  }

  private buildAuthForms(): void {
    this.authForms = new FormGroup({
      login: new FormControl(),
      password: new FormControl(),
    });
  }
}

