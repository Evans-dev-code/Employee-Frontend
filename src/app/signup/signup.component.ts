import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.signupData).subscribe(
      () => {
        alert('Signup successful! Redirecting to login...');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signup error:', error);
        alert('Signup failed!');
      }
    );
  }
}
