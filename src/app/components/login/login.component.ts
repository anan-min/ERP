import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          type="text"
          formControlName="username"
          placeholder="Enter your username"
        />
        <div
          *ngIf="
            loginForm.controls['username'].invalid &&
            loginForm.controls['username'].touched
          "
          class="error"
        >
          Username is required.
        </div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          formControlName="password"
          placeholder="Enter your password"
        />
        <div
          *ngIf="
            loginForm.controls['password'].invalid &&
            loginForm.controls['password'].touched
          "
          class="error"
        >
          Password is required.
        </div>
      </div>

      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor() {
    this.loginForm.enable();
  }
  private router: Router = inject(Router);
  authService = inject(AuthService);
  n_attempt = 0;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.n_attempt > 3) {
      alert('You have exceeded the maximum number of login attempts.');
      this.loginForm.disable();
      return;
    }

    if (!this.loginForm.valid) {
      alert('Please enter a valid username and password.');
      this.loginForm.reset();
      return;
    }

    const username = this.loginForm.value.username as string;
    const password = this.loginForm.value.password as string;
    if (this.authService.login(username, password)) {
      alert('Login successful!');
      this.n_attempt = 0;
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
    } else {
      this.loginForm.reset();
      this.n_attempt++;

      alert('Invalid username or password. Please try again.');

      if (this.n_attempt > 3) {
        alert('You have exceeded the maximum number of login attempts.');
        this.lockForm(1000);
      }
    }
  }

  lockForm(timeout: number) {
    this.loginForm.disable();
    setTimeout(() => {
      this.loginForm.enable();
    }, timeout);
  }
}
