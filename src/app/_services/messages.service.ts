import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  BaseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getMessages(PageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(PageNumber, pageSize);
    params = params.append("Container", container);

    return getPaginatedResult<Message[]>(this.BaseUrl + "messages", params, this.httpClient)
  }
  getMessageThreads(username: string) {
    return this.httpClient.get<Message[]>(this.BaseUrl + 'messages/thread/' + username);
  }
  sendMessage(username: string, content: string) {
    return this.httpClient.post<Message>(this.BaseUrl + 'messages', { recepientUserName: username, content });
  }
  deleteMessage(id: number) {
    return this.httpClient.delete(this.BaseUrl + 'messages/'+ id);
  }
  
}
