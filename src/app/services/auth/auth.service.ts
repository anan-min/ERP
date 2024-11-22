import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false); // Default is false (not logged in)
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  public login(username: string, password: string): boolean {
    this.loggedInSubject.next(true);
    return true;
  }
}
