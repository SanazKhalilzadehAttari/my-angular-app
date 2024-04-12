import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../_models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserModel } from '../_models/userModel';
import { BehaviorSubject, take } from 'rxjs';
import { Group } from '../_models/group';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  BaseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();
  constructor(private httpClient: HttpClient) { }

  createHubConnection(user: UserModel, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.start().catch(error => console.log(error));
    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })
    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe({
          next: messages => {
            messages.forEach(message => {
              if (!message.dateRead) {
                message.dateRead = new Date(Date.now());
              }
            })
            this.messageThreadSource.next([...messages]);
          }
        })
      }
    })
    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages => {
          this.messageThreadSource.next([...messages, message]);
        }
      })
    })

  }
  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection?.stop();

    }
  }

  getMessages(PageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(PageNumber, pageSize);
    params = params.append("Container", container);

    return getPaginatedResult<Message[]>(this.BaseUrl + "messages", params, this.httpClient)
  }
  getMessageThreads(username: string) {
    return this.httpClient.get<Message[]>(this.BaseUrl + 'messages/thread/' + username);
  }
  async sendMessage(username: string, content: string) {
    return this.hubConnection?.invoke('SendMessages', { RecepientUserName: username, content })
      .catch(error => console.log(error));
  }
  deleteMessage(id: number) {
    return this.httpClient.delete(this.BaseUrl + 'messages/' + id);
  }

}
