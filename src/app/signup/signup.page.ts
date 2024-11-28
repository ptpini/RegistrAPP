import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  signupError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async onSignup() {
    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;

      this.authService.register(username, password).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.router.navigate(['/login']); // Redirige al login en caso de éxito
          } else {
            this.signupError = true; // Manejo de error
          }
        },
        error: (error: any) => {
          this.signupError = true;
          console.error('Error en el registro:', error);
        },
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
