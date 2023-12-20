import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserModel } from '../_models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService  {
  baseUrl = 'https://localhost:7222/api/';
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'account/login', model).pipe(map((response: UserModel) => {
      const user = response;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    }))
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
  setCurrentUser(user: UserModel) {
    this.currentUserSource.next(user);
  }
  register(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )

  }
}
