import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { concat, map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { UserModel } from '../_models/userModel';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCatch = new Map();
  user: UserModel | undefined;
  userParams: UserParams | undefined;
  //paginationResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;
  //paginationResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })

  }
  getUserParams() {
    return this.userParams;

  }
  setUserParams(params: UserParams) {
    this.userParams = params;
  }
  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }
  getMembers(userParams: UserParams) {
    const response = this.memberCatch.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
   let params  = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    // if (this.members.length > 0) return of(this.members
    params = params.append("minAge", userParams.minAge.toString());
    params = params.append("maxAge", userParams.maxAge.toString());
    params = params.append("gender", userParams.gender);
    params = params.append("orderBy", userParams.orderBy);
    return getPaginatedResult<Member[]>(this.baseUrl + 'user', params,  this.http).pipe(
      map(response => {
        this.memberCatch.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  
  }
  getMember(username: string) {
    // const member = this.members.find(x => x.username === username);
    const member = [...this.memberCatch.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);
    console.log('member', member);
    console.log('username', username);
    if (member) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ... this.members[index], ...member }
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
  }

  addLike(username: string) {
    
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }
  getLikes(predicate: string, pageNumber: number, PageSize: number) {
    let params = getPaginationHeaders(pageNumber, PageSize);
    params = params.append('pridicate', predicate);
    return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params, this.http);
  }
 
}
