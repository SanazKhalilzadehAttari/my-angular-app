import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
    providedIn: 'root'
})
export class MembersService {
    baseUrl = environment.apiUrl;
    members: Member[] = [];
    paginationResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>;
    constructor(private http: HttpClient) { }

    getMembers(userParams: UserParams) {
        let params = new HttpParams();
        if (page && itemPerPage) {
            params = params.append("pageNumber", page);
            params = params.append("pageSize", itemPerPage);
        }
        // if (this.members.length > 0) return of(this.members);
        return this.http.get<Member[]>(this.baseUrl + 'user',
            { observe: 'response', params }).pipe(
                map(response => {
                    if (response.body) {
                        this.paginationResult.result = response.body;
                    }
                    const pagination = response.headers.get('Pagination');
                    if (pagination) {
                        this.paginationResult.pagination = JSON.parse(pagination);
                    }
                    return this.paginationResult;
                })
                /*  map(members => {
                    this.members = members;
                    return members;
                  })*/
            );
    }
    getMember(username: string) {
        const member = this.members.find(x => x.username === username);
        if (member) return of(member);
        return this.http.get<Member>(this.baseUrl + 'user/' + username);
    }
    updateMember(member: Member) {
        return this.http.put(this.baseUrl + 'user', member).pipe(
            map(() => {
                const index = this.members.indexOf(member);
                this.members[index] = { ...this.members[index], ...member };
            })
        );
    }

    setMainPhoto(photoId: number) {
        return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
    }
    deletePhoto(photoId: number) {
        return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId);
    }
}
