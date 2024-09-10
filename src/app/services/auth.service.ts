import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Head } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwt$: BehaviorSubject<string> = new BehaviorSubject('');

  public loggedIn: boolean = this.jwt$.value !== '';
  constructor() { }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({'Authorization': this.jwt$.value})
  }

  public login() {
    
  }

  public register() {
    
  }
}
