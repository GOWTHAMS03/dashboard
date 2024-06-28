import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';
import { User } from './user.model';

interface LoginData {
  userEmail: string;
  userPassword: string;
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
  private readonly PATH_OF_API = 'http://localhost:8080';
  private readonly API_ENDPOINTS = {
    SIGNIN: '/api/auth/signin',
    SIGNUP: 'api/auth/signup',
    FOR_USER: '/api/forUser',
    FOR_ADMIN: '/api/forAdmin',
    USERS: '/api/auth/users',
  };

  private readonly JSON_CONTENT_TYPE = 'application/json';
  private readonly USER_STORAGE_KEY = 'user_data';
  private loggedInUser: any;


  constructor(private httpclient: HttpClient, private userAuthService: UserAuthService) {}
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private getRequestHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
  
    if (token !== null) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      console.error('No token available');
   
      throw new Error('No token available');
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  setLocalStorage(response: any): void {
    if (response && response.accessToken && response.roles && response.email) {
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('roles', JSON.stringify(response.roles));
      localStorage.setItem('email', response.email);
     
      localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(response));
    } else {
      console.error('Invalid or missing response properties:', response);
  
    }
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  getStoredUser(): any {
    const storedUserData = localStorage.getItem(this.USER_STORAGE_KEY);
    return storedUserData ? JSON.parse(storedUserData) : null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  


  login(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': this.JSON_CONTENT_TYPE,
      'No-Auth': 'True',
    });

    return this.httpclient.post(
      this.PATH_OF_API + this.API_ENDPOINTS.SIGNIN,
      loginData,
      { headers }
    ).pipe(
      map((response: any) => {
        this.setLocalStorage(response);
        this.isAuthenticatedSubject.next(true);
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  forUser(): Observable<string> {
    return this.httpclient.get<string>(
      this.PATH_OF_API + this.API_ENDPOINTS.FOR_USER,
      {
        headers: this.getRequestHeaders(),
      }
    ).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  forAdmin(): Observable<string> {
    return this.httpclient.get<string>(
      this.PATH_OF_API + this.API_ENDPOINTS.FOR_ADMIN,
      {
        headers: this.getRequestHeaders(),
      }
    ).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();

    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
  }

  signup(signupData: SignupData): Observable<any> {
    const url = 'http://localhost:8080/api/auth/signup'; 
    const headers = new HttpHeaders({
      'Content-Type': this.JSON_CONTENT_TYPE,
    });
    console.log(signupData)
  
    return this.httpclient.post(
      url,
      signupData,
      { headers }
    ).pipe(
      map((response: any) => {
        this.setLocalStorage(response);
        return response;
      }),
      catchError((error) => this.handleError(error))
    );
  }
  

  getUsers(): Observable<any> {
    try {
      const headers = this.getRequestHeaders();

      console.log("hi")
      return this.httpclient.get<User[]>(this.PATH_OF_API + this.API_ENDPOINTS.USERS, { headers })
        .pipe(
          catchError((error) => this.handleError(error))
      );
    } catch (e) {
      console.error('Error fetching users:');
      return throwError(e);
    }
  }


  updateUser(userId: number, updatedUser: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log(updatedUser,"this is service")
  
    return this.httpclient.put(
      `${this.PATH_OF_API}/api/auth/users/${userId}`,
      updatedUser,
      { headers: this.getRequestHeaders() }
    ).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  

  deleteUser(userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpclient.delete(
      `${this.PATH_OF_API}/api/auth/users/${userId}`,
      { headers: this.getRequestHeaders() }
    ).pipe(
      catchError((error) => this.handleError(error))
    );
  }


}
