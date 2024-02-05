import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { Observable, take } from 'rxjs';
import { Pagination } from '../../_models/pagination';
import { UserParams } from '../../_models/userParams';
import { UserModel } from '../../_models/userModel';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]> | undefined;
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [{ value: "male", display: "Male" }, { value: "female", display: "Female" }];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
    
  }
  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }
  loadMembers() {
    if (this.userParams) {
      this.memberService.setUserParams(this.userParams);
      this.memberService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.pagination && response.result) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      })
    }
   

  }
  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }

  }

  resetFilters() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
    
  }
}
