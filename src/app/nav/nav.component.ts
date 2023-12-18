import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service'
import { UserModel } from '../_models/userModel';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService) {

  }
  ngOnInit(): void {
    
  }
 
  Login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    }
    )
    console.log(this.model);
  }
  logout() {
    this.accountService.logout();
  }

}
