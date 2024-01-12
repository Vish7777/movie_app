// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://ec2-3-109-247-37.ap-south-1.compute.amazonaws.com:8081/Loginservice/api/v1/auth/login';
  private tokenKey = 'authToken';
  private usernameKey = 'authUsername'; // New key for storing username

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `userName=${userName}&password=${password}`;

    return this.http
      .get<any>(`${this.apiUrl}?${body}`, { headers })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.saveToken(response.token);
            this.saveUsername(response.userName); 
          }
        }),
        catchError(this.handleError)
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey); // Retrieve the stored username
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username); // Save the username
  }

  private handleError(error: any) {
    return throwError(error.error || 'Server error');
  }
}
