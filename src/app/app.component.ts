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

  constructor(private http: HttpClient, private accountService: AccountService) {
}
  ngOnInit(): void {

    this.setCurrentUser();
}

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: UserModel = JSON.parse(userString);
    this.accountService.setCurrentUser(user);

    
    
  }
}
