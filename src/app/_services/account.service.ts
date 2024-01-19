import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserModel } from '../_models/userModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService  {
  baseUrl = environment.apiUrl;
  //baseUrl = 'https://localhost:44321/api/';
  private currentUserSource = new BehaviorSubject<UserModel | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'account/login', model).pipe(map((response: UserModel) => {
      const user = response;
      if (user) {
        this.setCurrentUser(user);
                }
    }))
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
  }
  setCurrentUser(user: UserModel) {
    localStorage.setItem("user", JSON.stringify(user));
   // this.currentUserSource.next(user);
    this.currentUserSource.next(user);
    console.log('current usert', user);
  }
  register(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )

  }
}
