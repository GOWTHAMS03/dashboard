
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword = false;
  errorMessage: string = '';
  signupForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  signup(): void {
    const passwordControl = this.signupForm.get('password')!;
    const confirmPasswordControl = this.signupForm.get('confirmPassword')!;
  
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ 'mismatch': true });
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }
  
    this.userService.signup(this.signupForm.value).subscribe(
      (response: any) => {
        this.toastr.success('User registered successfully!', 'Success');
        console.log('Signup successful!', response);
      },
      (error: any) => {
        console.error('Error registering user:', error);
  
        if (error.status === 409) {
          this.toastr.error('User with this email already exists.', 'Error');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
        }
      }
    );
  }
  

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
