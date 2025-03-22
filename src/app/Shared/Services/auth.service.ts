import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IloginRequest, IloginResponse } from '../Interfaces/ilogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  private apiUrl = environment.apiURL;
  // Create a signal for user authentication status
  private isAuthenticatedSignal = signal<boolean>(
    this.checkInitialLoginState()
  );

  constructor(private http: HttpClient) {}

  // Get the authentication signal
  isAuthenticated() {
    return this.isAuthenticatedSignal;
  }

  // Login
  login(credentials: IloginRequest): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', credentials, {
      headers: this.headers,
    });
  }

  // Create new account for user
  createNewAccount(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/register', data, {
      headers: this.headers,
    });
  }

  // Save token to localStorage
  saveToken(response: IloginResponse) {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userDetails', JSON.stringify(response.user));
    this.isAuthenticatedSignal.set(true);
  }

  getCurrentUser() {
    let user = localStorage.getItem('userDetails');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSignal.set(false);
  }

  // Check if user is logged in initially (from localStorage)
  private checkInitialLoginState(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get all registrations
  getAllRegistrations(): Observable<any> {
    let token = localStorage.getItem('authToken');
    return this.http.get(this.apiUrl + '/auth/death-records', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Save registration
  saveRegistration(data:any): Observable<any> {
    let token = localStorage.getItem('authToken');
    return this.http.post(this.apiUrl + '/auth/save',data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
