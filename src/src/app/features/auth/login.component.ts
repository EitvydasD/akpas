import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { LoginRequest } from '../../core/types/auth.types';
import { BaseFeature } from '../base.feature';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginComponent extends BaseFeature {
  private readonly userService = inject(UserService);

  public form: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.login(this.form.getRawValue() as LoginRequest);
    if (this.userService.isAuthenticated) {
      this.router.navigate(['/profile']);
    }
  }
}
