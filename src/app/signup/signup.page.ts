import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm: FormGroup;
  signupError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSignup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      this.authService.register(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/login']);
          } else {
            this.signupError = true;
          }
        },
        error: () => {
          this.signupError = true;
        },
      });
    }
  }
}
