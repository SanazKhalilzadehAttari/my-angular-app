import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  constructor() { }
  registerMode = false;
  users: any;
    //ngOnInit(): void {
    //  this.getUsers();
    //}
  //getUsers() {
  //  this.http.get("http://localhost:5231/api/user").subscribe(
  //    {
  //      next: response => this.users = response,
  //      error: error => console.log(error),
  //      complete: () => console.log("request is completed")
  //    }
  //  );
  //}
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
