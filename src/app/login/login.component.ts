import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token); // store the token
        this.router.navigate(['/employees']);   // redirect to employees
      },
      error: () => {
        this.errorMessage = 'Login failed. Please check credentials.';
      }
    });
  }
}
