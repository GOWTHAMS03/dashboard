// signup.component.ts
import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword = false;
  errorMessage: string = '';

  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {}

  signup(signupForm: NgForm): void {
    // Ensure passwords match
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Send the signup data to your API
    this.userService.signup(this.signupData).subscribe(
      (response: any) => {
        console.log('User registered successfully!', response);
        // Handle success, e.g., redirect to login page or show a success message
      },
      (error: any) => {
        console.error('Error registering user:', error);

        // Check for specific error responses from the server
        if (error.status === 409) {
          this.errorMessage = 'User with this email already exists.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
