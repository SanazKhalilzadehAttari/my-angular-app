import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './_models/userModel';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'my-angular-app';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService) {
}
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
}
  getUsers() {
    this.http.get("http://localhost:5231/api/user").subscribe(
      {
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log("request is completed")
      }
    );
  }
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: UserModel = JSON.parse(userString);
    this.accountService.setCurrentUser(user);

    
    
  }
}
