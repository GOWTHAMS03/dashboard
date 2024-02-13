import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

interface LoginData {
  userName: string;
  userPassword: string;
  // Add any other properties based on your actual data structure
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: LoginData) {
    return this.httpclient.post(this.PATH_OF_API + '/auth/signin', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();
  
    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch; // Return true if there is a match
          }
        }
      }
    }
  
    return isMatch; // Return false if no match is found
  }

  private getRequestHeaders() {
    const token = this.userAuthService.getToken();
    return new HttpHeaders({ 
      'Authorization': `Bearer ${token}`
    });
  }

  public signup(signupData: SignupData) {
    return this.httpclient.post(this.PATH_OF_API + '/auth/signup', signupData, {
      headers: this.getRequestHeaders(),
    });
  }
  
  
}
