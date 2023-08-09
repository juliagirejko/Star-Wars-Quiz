import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeUsername: string = "username";
  fakePassword: string = "password";
  isGuest: boolean = false

  private guest = new BehaviorSubject<boolean>(this.isGuest)
  isGuest$ = this.guest.asObservable()

  constructor() { }

  setAsGuest() {
    this.isGuest = true
    this.guest.next(this.isGuest)
  }

  login(username: string, password: string): Observable<any> {
    if (username == this.fakeUsername && password == this.fakePassword) {
      localStorage.setItem("token", "my-super-secret-token-from-server");
      return of(new HttpResponse({ status: 200 }));
    } else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}
