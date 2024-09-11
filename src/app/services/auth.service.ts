import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Head, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './responses/login.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwt$: BehaviorSubject<string> = new BehaviorSubject('');
  private url: string = `${environment.url}/v1/auth`

  public loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null && token !== '';
   }
  constructor(private httpClient: HttpClient) { }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.url + '/login', { username, password })
      .pipe(
        map(response => {
          this.jwt$.next(response.token);
          localStorage.setItem('token', response.token)
          return response;
        })
      );
  }

  public register(username: string, password: string): Observable<{ errors: string, success: boolean }> {
    return this.httpClient.post<never>(this.url + '/register', { username, password })
      .pipe(
        catchError((err, caught) => of({ err, success: false })),
        map(response => {
          if (!response?.success) {
            return { errors: 'registration error', success: false };
          }
          return { errors: '', success: true };
        })
      )
  }

  public logout() {
    this.jwt$.next('');
  }
}
