import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
 
})
export class SigninComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: any = { email: '', password: '' }; 

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}


  login(loginForm: any) {
    console.log('Form Data:', loginForm.value);

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log('API Response:', response);

        if (response.accessToken && response.roles) {
          this.userAuthService.setRoles(response.roles);

          const role = response.roles[0];
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }

          this.toastr.success('Login successful!', 'Success');
        } else {
          console.error('Invalid response structure:', response);
          this.toastr.error('Unexpected response structure. Please try again.', 'Error');
        }
      },
      (error) => {
        console.error(error);

        if (error.status === 401) {
          this.toastr.error('Incorrect username or password. Please try again.', 'Error');
        } else {
          this.toastr.error('Login failed. Please check your credentials and try again.', 'Error');
        }
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
