import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service'
import { UserModel } from '../_models/userModel';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    
  }
 
  Login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.model = {};
      }
      //error: error => {
      //  this.toastr.error(error.error)
      //}
    }
    )
    console.log(this.model);
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
