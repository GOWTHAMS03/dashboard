import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: any[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const rolesString = localStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : [];
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();
  }

  public logout(): void {
    this.clear();
    localStorage.removeItem('currentUser');
  
  }
}
